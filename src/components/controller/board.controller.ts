import boardModel from '../model/board.model';

class BoardController {
    async getBoard() {
        const board = await boardModel.getBoard();
        return board;
    }

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

    async deleteTaskById() {
        await boardModel.deleteTaskById();
    }

    async getTasks(columnID: string) {
        const tasks = await boardModel.getTasks(columnID);
        return tasks;
    }

    async updateTasksSet(dropDataSetColumn: string, dropDataSetTask: string) {
        await boardModel.updateTasksSet(dropDataSetColumn, dropDataSetTask);
    }
}

export default new BoardController();
