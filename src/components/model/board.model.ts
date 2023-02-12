import { createColumn, getColumns, deleteColumnById, updateColumnById } from '../../api/columns';
import { state } from '../../store/state';

class BoardModel {
    async createColumn(title: string) {
        await createColumn(state.token as string, state.boardId as string, title, 0);
    }

    async getColumns() {
        const resp = await getColumns(state.token as string, state.boardId as string);
        if (typeof resp !== 'string') {
            state.columns = resp;
        }
    }

    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
    }

    async updateColumnById(columnId: string, title: string) {
        await updateColumnById(state.token as string, state.boardId as string, columnId, title, 0);
    }
}

export default new BoardModel();
