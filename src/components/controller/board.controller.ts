import boardModel from '../model/board.model';

class BoardController {
    async createColumn(title: string) {
        await boardModel.createColumn(title);
    }

    async getColumns() {
        await boardModel.getColumns();
    }

    async deleteColumnById(id: string) {
        await boardModel.deleteColumnById(id);
    }

    async updateColumnById(columnId: string, title: string) {
        await boardModel.updateColumnById(columnId, title);
    }
}

export default new BoardController();
