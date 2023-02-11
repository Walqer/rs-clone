import boardModel from '../model/board.model';

class BoardController {
    async createColumn(title: string) {
        await boardModel.createColumn(title);
    }

    async getColumns() {
        await boardModel.getColumns();
    }
}

export default new BoardController();
