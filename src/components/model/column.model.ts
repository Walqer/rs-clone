import { deleteColumnById } from '../../api/columns';
import { state } from '../../store/state';

class ColumnModel {
    async deleteColumnById(id: string) {
        await deleteColumnById(state.token as string, state.boardId as string, id);
    }
}

export default new ColumnModel();
