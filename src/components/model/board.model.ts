import { createColumn, getColumns, deleteColumnById, updateColumnById, updateColumnsSet } from '../../api/columns';
import { Column, ColumnOrder } from '../../spa/types';
import { state } from '../../store/state';

class BoardModel {
    async createColumn(title: string) {
        await createColumn(state.token as string, state.boardId as string, title, 1);
    }

    async getColumns() {
        state.columns = (await getColumns(state.token as string, state.boardId as string)) as Column[];
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
