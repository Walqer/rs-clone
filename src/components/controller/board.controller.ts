import boardModel from '../model/board.model';

class BoardController {
    async saveBoardUsers(users: string[]) {
        await boardModel.saveBoardUsers(users);
    }

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

    async createNewTask(columnID: string, title: string, order: number) {
        await boardModel.createNewTask(columnID, title, order);
    }

    async getTasks(columnID: string) {
        const tasks = await boardModel.getTasks(columnID);
        return tasks;
    }
}

export default new BoardController();
