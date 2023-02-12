import columnModel from '../model/column.model';
// eslint-disable-next-line import/no-cycle
import boardView from '../view/board.view';

class ColumnController {
    async deleteColumnById(id: string) {
        await columnModel.deleteColumnById(id);
        await boardView.update();
    }

    async updateColumnById(columnId: string, title: string) {
        await columnModel.updateColumnById(columnId, title);
    }
}

export default new ColumnController();
