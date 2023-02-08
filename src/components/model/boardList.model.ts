import { createBoard, getBoardsSetByUserId } from '../../api/boards';
import { state } from '../../store/state';

class BoardListModel {
    token: string;

    userId: string;

    constructor() {
        if (typeof state === 'object') {
            this.token = state.token as string;
            this.userId = state.userId as string;
        } else {
            this.token = 'invalid token';
            this.userId = 'invalid token';
        }
    }

    async getUserBoards() {
        const boards = await getBoardsSetByUserId(this.token, this.userId);
        if (typeof boards !== 'string') {
            return boards;
        }
        return 'error';
    }

    getBoardColorList() {
        return ['0079BF', 'D29034', '519839', 'B04632', '89609E', 'CD5AAF'];
    }

    async createBoard(name: string, color: string) {
        await createBoard(this.token, name, this.userId, ['user1', 'user2'], color, '');
    }
}

export default new BoardListModel();
