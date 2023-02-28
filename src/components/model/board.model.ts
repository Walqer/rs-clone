import { getBoardById, updateBoardUsers } from '../../api/boards';
import { createColumn, getColumns, deleteColumnById, updateColumnById, updateColumnsSet } from '../../api/columns';
import { createTask, deleteTaskById, getTasks, updateTaskColumn, updateTasksSet } from '../../api/tasks';
import { getAllUsers } from '../../api/users';
import { Column, ColumnOrder, Board, Task, TaskOrder } from '../../spa/types';
import { state } from '../../store/state';

class BoardModel {
    async getBoard(): Promise<Board | string> {
        const board = await getBoardById(state.token as string, state.boardId as string);
        return board;
    }

    async getBoardUsers() {
        const board = await getBoardById(state.token as string, state.boardId as string);
        const users = await getAllUsers(state.token as string);
        if (typeof board !== 'string' && typeof users !== 'string') {
            state.boardOwner = users.find((el) => el._id === board.owner) || null;
            state.boardUsers = users.filter((val) => board.users.includes(val._id));
            state.notBoardUsers = users.filter((val) => !board.users.includes(val._id) && val._id !== board.owner);
        }
    }

    async saveBoardUsers(users: string[]) {
        await updateBoardUsers(state.token as string, state.boardId as string, users);
    }

    async createColumn(title: string) {
        await createColumn(state.token as string, state.boardId as string, title, state.countColumns);
    }

    async getColumns() {
        state.columns = (await getColumns(state.token as string, state.boardId as string)) as Column[];
        state.columns.sort((a, b) => (a.order > b.order ? 1 : -1));
        state.countColumns = state.columns.length;
    }

    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
        const columnOrder: ColumnOrder[] = [];
        let columnIndex = 0;
        state.columns.forEach((elem, index) => {
            if (elem._id === id) {
                columnIndex = index;
            }
        });
        state.columns.splice(columnIndex, 1);
        state.columns.forEach((elem, index) => {
            elem.order = index;
            const { title, boardId, ...column } = elem;
            columnOrder.push(column);
        });
        await updateColumnsSet(state.token as string, columnOrder);
    }

    async updateColumnById(columnId: string, title: string) {
        await updateColumnById(state.token as string, state.boardId as string, columnId, title, 0);
    }

    async updateColumnSet() {
        if (state.columns) {
            const columnOrder: ColumnOrder[] = [];
            let startIndex = 0;
            let enterIndex = 0;
            state.columns.forEach((elem, index) => {
                if (elem._id === state.dragStartId) startIndex = index;
                if (elem._id === state.dragEnterId) enterIndex = index;
            });
            const temp = state.columns[startIndex];
            state.columns.splice(startIndex, 1);
            state.columns.splice(enterIndex, 0, temp);
            state.columns.forEach((elem, index) => {
                elem.order = index;
                const { title, boardId, ...column } = elem;
                columnOrder.push(column);
            });
            await updateColumnsSet(state.token as string, columnOrder);
        }
    }

    async createNewTask(columnID: string, title: string, order: number) {
        let orderIndex = 0;
        state.columnTasks.forEach((col, i) => {
            col.forEach((t) => {
                if (t.columnId === columnID) orderIndex = i;
            });
        });
        order = state.columnTasks[orderIndex].length;
        await createTask(state.token as string, state.boardId as string, columnID, title, order, ' ', state.userId as string, []);
    }

    async deleteTaskById() {
        await deleteTaskById(state.token as string, state.boardId as string, state.columnId as string, state.taskId as string);
        const arrayTaskOrder: TaskOrder[] = [];
        let columnIndex = 0;
        let taskIndex = 0;
        state.columnTasks.forEach((col, i) => {
            col.forEach((t, j) => {
                if (t.columnId === state.columnId) columnIndex = i;
                if (t._id === state.taskId) taskIndex = j;
            });
        });
        state.columnTasks[columnIndex].splice(taskIndex, 1);
        state.columnTasks.forEach((col) => {
            col.forEach((t, j) => {
                t.order = j;
                const { title, boardId, description, userId, users, ...taskOrder } = t;
                arrayTaskOrder.push(taskOrder);
            });
        });
        await updateTasksSet(state.token as string, arrayTaskOrder);
    }

    async getTasks(columnId: string) {
        const tasks = (await getTasks(state.token as string, state.boardId as string, columnId)) as Task[];
        tasks.sort((a, b) => (a.order > b.order ? 1 : -1));
        return tasks;
    }

    async updateTasksSet(dropDataSetColumn: string, dropDataSetTask: string) {
        let dragColumnIndex = 0;
        let dropColumnIndex = 0;
        let dragTaskIndex = 0;
        let dropTaskIndex = 0;

        state.columns.forEach((col, i) => {
            if (col._id === dropDataSetColumn) dropColumnIndex = i;
        });

        state.columnTasks.forEach((col, i) => {
            col.forEach((task, j) => {
                if (state.dragElement?.dataset.column === task.columnId) dragColumnIndex = i;
                if (state.dragElement?.dataset.task === task._id) dragTaskIndex = j;
                if (dropDataSetTask === task._id) dropTaskIndex = j;
            });
        });

        const temp = state.columnTasks[dragColumnIndex][dragTaskIndex];
        if (dragColumnIndex !== dropColumnIndex) {
            await updateTaskColumn(state.token as string, state.boardId as string, temp.columnId, temp._id, dropDataSetColumn);
            temp.columnId = dropDataSetColumn;
        }
        state.columnTasks[dragColumnIndex].splice(dragTaskIndex, 1);
        state.columnTasks[dropColumnIndex].splice(dropTaskIndex, 0, temp);

        const arrayTaskOrder: TaskOrder[] = [];
        state.columnTasks.forEach((col) => {
            col.forEach((task, j) => {
                task.order = j;
                const { title, boardId, description, userId, users, ...taskOrder } = task;
                arrayTaskOrder.push(taskOrder);
            });
        });
        
        await updateTasksSet(state.token as string, arrayTaskOrder);
    }
}

export default new BoardModel();
