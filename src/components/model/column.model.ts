import { deleteColumnById, updateColumnById } from '../../api/columns';
import { state } from '../../store/state';

class ColumnModel {
    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
    }

    async updateColumnById(columnId: string, title: string) {
        await updateColumnById(state.token as string, state.boardId as string, columnId, title, 0);
    }
}

export default new ColumnModel();
