import columnModel from '../model/column.model';

class ColumnController {
    deleteColumnById(id: string) {
        columnModel.deleteColumnById(id);
    }
}

export default new ColumnController();
