import { createBoard, getBoardsSetByUserId } from '../../api/boards';
import { state } from '../../store/state';

class BoardListModel {
    token: string;

    constructor() {
        if (typeof state.token === 'string') {
            this.token = state.token;
        } else {
            this.token = 'invalid token';
        }
    }

    async getUserBoards() {
        const boards = await getBoardsSetByUserId(this.token, '63de8ba989825aaaf0e60412');
        if (typeof boards !== 'string') {
            return boards;
        }
        return 'error';
    }

    getBoardColorList() {
        return ['0079BF', 'D29034', '519839', 'B04632', '89609E', 'CD5AAF'];
    }

    async createBoard(name: string, color: string) {
        await createBoard(this.token, name, '63de8ba989825aaaf0e60412', ['user1', 'user2'], color, '');
    }
}

export default new BoardListModel();
