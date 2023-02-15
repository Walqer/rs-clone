import { createColumn, getColumns, deleteColumnById, updateColumnById, updateColumnsSet } from '../../api/columns';
import { state } from '../../store/state';

class BoardModel {
    async createColumn(title: string) {
        state.countColumns += 1;
        await createColumn(state.token as string, state.boardId as string, title, state.countColumns);
    }

    async getColumns() {
        const columnIds: string[] = [];
        const columns = await getColumns(state.token as string, state.boardId as string);
        if (typeof columns !== 'string') {
            columns.forEach((column) => {
                columnIds.push(column._id);
            });
            columns.sort((a, b) => a.order > b.order ? 1 : -1);
            state.columns = columns;
        }
    }

    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
    }

    async updateColumnById(columnId: string, title: string) {
        await updateColumnById(state.token as string, state.boardId as string, columnId, title, 0);
    }

    async updateColumnSet() {
        const temp = state.columnOrder[0].order;
        state.columnOrder[0].order = state.columnOrder[1].order;
        state.columnOrder[1].order = temp;
        await updateColumnsSet(state.token as string, state.columnOrder)
        state.columnOrder.length = 0;
    }
}

export default new BoardModel();
