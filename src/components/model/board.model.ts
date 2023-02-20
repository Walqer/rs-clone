import { createColumn, getColumns, deleteColumnById, updateColumnById, updateColumnsSet } from '../../api/columns';
import { Column, ColumnOrder } from '../../spa/types';
import { state } from '../../store/state';

class BoardModel {
    async createColumn(title: string) {
        state.countColumns += 1;
        await createColumn(state.token as string, state.boardId as string, title, state.countColumns);
    }

    async getColumns() {
        if (localStorage.getItem('columns')) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            state.columns = JSON.parse(localStorage.columns) as Column[];
        } else {
            state.columns = (await getColumns(state.token as string, state.boardId as string)) as Column[];
            localStorage.columns = JSON.stringify(state.columns);
        }
    }

    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
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
                const { title, boardId, ...column } = elem;
                columnOrder.push(column);
            });
            const temp = state.columns[startIndex];
            state.columns.splice(startIndex, 1);
            state.columns.splice(enterIndex, 0, temp);
            localStorage.columns = JSON.stringify(state.columns);
            await updateColumnsSet(state.token as string, columnOrder);
        }
    }
}

export default new BoardModel();
