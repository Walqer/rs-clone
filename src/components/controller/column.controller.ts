import columnModel from '../model/column.model';

class ColumnController {
    removeColumn(token: string, boardId: string, columnId: string) {
        columnModel.removeColumn(token, boardId, columnId);
    }
}

export default new ColumnController();
