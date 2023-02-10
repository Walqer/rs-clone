import columnModel from '../model/column.model';

class ColumnController {
    async deleteColumnById(id: string) {
        await columnModel.deleteColumnById(id);
    }
}

export default new ColumnController();
