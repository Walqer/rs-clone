import { createBoard, getBoardsSetByUserId } from '../../api/boards';

class BoardListModel {
    token: string;

    constructor() {
        this.token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGU4YmE5ODk4MjVhYWFmMGU2MDQxMiIsImxvZ2luIjoiQWxpbXVzaW0iLCJpYXQiOjE2NzU2MTc5OTcsImV4cCI6MTY3NTY2MTE5N30.a4yBwup33lMaVmqPhzdieFHrzkuadXebZcKhba5ZS6E';
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
