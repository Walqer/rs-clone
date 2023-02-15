import { createColumn, getColumns, deleteColumnById, updateColumnById, getColumnsSet } from '../../api/columns';
import { Column } from '../../spa/types';
import { state } from '../../store/state';

class BoardModel {
    async createColumn(title: string) {
        state.countColumns += 1;
        await createColumn(state.token as string, state.boardId as string, title, state.countColumns);
    }

    async getColumns() {
        const arrayIds: string[] = [];
        const columns = await getColumns(state.token as string, state.boardId as string);
        if (typeof columns !== 'string') {
            columns.forEach((column) => {
                arrayIds.push(column._id);
            });
            state.columns = (await getColumnsSet(state.token as string, state.userId as string, arrayIds)) as Column[];
        }
        console.log(state.columns);
    }

    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
    }

    async updateColumnById(columnId: string, title: string) {
        await updateColumnById(state.token as string, state.boardId as string, columnId, title, 0);
    }
}

export default new BoardModel();
