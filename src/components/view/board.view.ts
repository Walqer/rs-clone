import { Control } from '../../utils/Control';
import boardController from '../controller/board.controller';
import columnView from './column.view';

class BoardView {
    async render(token: string, boardid: string): Promise<HTMLElement> {
        const board = new Control<HTMLElement>('div', 'board');
        const header = new Control<HTMLElement>('div', 'board__header');
        const title = new Control<HTMLElement>('h2', 'board__header-title');
        const search = new Control<HTMLElement>('div', 'board__header-search');
        const columns = new Control<HTMLElement>('div', 'board__columns');
        const createColumn = new Control<HTMLElement>('div', 'column_create');

        header.append(board.element);
        title.append(header.element);
        search.append(header.element);
        columns.append(board.element);
        createColumn.append(columns.element);
        title.element.textContent = 'Board';
        const columnsArray = await boardController.getAllColumns(token, boardid);
        if (columnsArray) {
            columnsArray.forEach((elem) => {
                columns.element.append(columnView.render(elem.title));
            });
        }
        createColumn.element.textContent = 'create column';
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        createColumn.element.addEventListener('click', async () => {
            await boardController.addColumn(token, boardid, 'hahah', 0);
        });

        return board.element;
    }
}

export default new BoardView();
