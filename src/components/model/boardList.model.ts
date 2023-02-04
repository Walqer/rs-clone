import { getBoardsSetByUserId } from '../../api/boards';

class BoardListModel {
    async getUserBoards() {
        const boards = await getBoardsSetByUserId(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGU4YmE5ODk4MjVhYWFmMGU2MDQxMiIsImxvZ2luIjoiQWxpbXVzaW0iLCJpYXQiOjE2NzU1MjkxNzIsImV4cCI6MTY3NTU3MjM3Mn0.5_aDPDcOkr5mOEP56iXz1DVMiojRMa6ZhW7Co_K0tFE',
            '63de8ba989825aaaf0e60412'
        );
        if (typeof boards !== 'string') {
            return boards;
        }
        return 'error';
    }
}

export default new BoardListModel();
