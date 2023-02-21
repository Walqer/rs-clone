import { getBoardById } from '../../api/boards';
import { createColumn, getColumns, deleteColumnById, updateColumnById, updateColumnsSet } from '../../api/columns';
import { getAllUsers } from '../../api/users';
import { Column, ColumnOrder } from '../../spa/types';
import { state } from '../../store/state';

class BoardModel {
    async getBoardUsers() {
        const board = await getBoardById(state.token as string, state.boardId as string);
        const users = await getAllUsers(state.token as string);
        if (typeof board !== 'string' && typeof users !== 'string') {
            state.boardOwner = users.find((el) => el._id === board.owner) || null;
            state.boardUsers = users.filter((val) => board.users.includes(val._id));
            state.notBoardUsers = users.filter((val) => !board.users.includes(val._id) && val._id !== board.owner);
        }
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
}

export default new BoardModel();
