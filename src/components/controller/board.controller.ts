import boardModel from '../model/board.model';

class BoardController {
    async getBoardUsers() {
        await boardModel.getBoardUsers();
    }

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

    async updateColumnSet() {
        await boardModel.updateColumnSet();
    }
}

export default new BoardController();
