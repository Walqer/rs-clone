import boardModel from '../model/board.model';

class BoardController {
    async addColumn(token: string, boardId: string, title: string, order: number, update: () => void) {
        await boardModel.addColumn(token, boardId, title, order);
        update();
    }

    getAllColumns(token: string, boardId: string) {
        return boardModel.getAllColumns(token, boardId);
    }
}

export default new BoardController();
