import { getBoardsSetByUserId } from '../../api/boards';

class BoardListModel {
    async getUserBoards() {
        const boards = await getBoardsSetByUserId(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGU4YmE5ODk4MjVhYWFmMGU2MDQxMiIsImxvZ2luIjoiQWxpbXVzaW0iLCJpYXQiOjE2NzU1NzMzOTcsImV4cCI6MTY3NTYxNjU5N30.jzhPVXmg1MpMUcE3TPi0gSCeVpnTY6e_781bFPh-U6k',
            '63de8ba989825aaaf0e60412'
        );
        if (typeof boards !== 'string') {
            return boards;
        }
        return 'error';
    }
}

export default new BoardListModel();
