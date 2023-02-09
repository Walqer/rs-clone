import { createColumn, getColumns } from '../../api/columns';
import { state } from '../../store/state';

class BoardModel {
    async addColumn(token: string, boardId: string, title: string, order: number) {
        await createColumn(token, boardId, title, order);
    }

    // eslint-disable-next-line consistent-return
    async getAllColumns(token: string, boardId: string) {
        const resp = await getColumns(token, boardId);
        if (typeof resp === 'object') return resp;
        state.authError = resp;
    }
}

export default new BoardModel();
