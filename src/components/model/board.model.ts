import { createColumn, getColumns } from '../../api/columns';
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
}

export default new BoardModel();
