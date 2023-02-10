import { deleteColumnById } from '../../api/columns';
import { state } from '../../store/state';

class ColumnModel {
    deleteColumnById(id: string) {
        const resp = deleteColumnById(state.token as string, state.boardId as string, id);
        if (typeof resp === 'string') state.columnError = resp;
    }
}

export default new ColumnModel();
