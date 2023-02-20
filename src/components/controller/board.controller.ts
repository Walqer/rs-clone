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

    async updateColumnSet() {
        await boardModel.updateColumnSet();
    }

    async createNewTask(columnID: string, title: string, order: number) {
        await boardModel.createNewTask(columnID, title, order);
    }

    async getTasks(columnID: string) {
        await boardModel.getTasks(columnID);
    }
}

export default new BoardController();
