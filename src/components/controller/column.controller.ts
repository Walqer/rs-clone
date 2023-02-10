import columnModel from '../model/column.model';

class ColumnController {
    removeColumn(token: string, boardId: string, columnId: string, update: () => void) {
        columnModel.removeColumn(token, boardId, columnId);
        update();
    }
}

export default new ColumnController();
