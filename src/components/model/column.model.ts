import { deleteColumnById } from '../../api/columns';
import { state } from '../../store/state';

class ColumnModel {
    removeColumn(token: string, boardId: string, columnId: string) {
        const resp = deleteColumnById(token, boardId, columnId);
        if (typeof resp !== 'object') state.authError = resp;
    }
}

export default new ColumnModel();
