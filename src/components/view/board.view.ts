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
        const createColumn = new Control<HTMLElement>('div', 'column-create');
        const createColumnTitle = new Control<HTMLElement>('a', 'column-create__title');
        const createColumnInput = new Control<HTMLInputElement>('input', 'column-create__input');
        const createColumnBtn = new Control<HTMLButtonElement>('button', 'column-create__btn');

        header.append(board.element);
        title.append(header.element);
        search.append(header.element);
        columns.append(board.element);
        createColumn.append(columns.element);
        createColumnTitle.append(createColumn.element);
        createColumnInput.append(createColumn.element);
        createColumnBtn.append(createColumn.element);
        createColumnTitle.element.textContent = 'Add another column';
        createColumnInput.element.placeholder = 'Enter column name..';
        createColumnBtn.element.innerHTML = 'Add column';
        title.element.textContent = 'Board';
        const columnsArray = await boardController.getAllColumns(token, boardid);
        if (columnsArray) {
            columnsArray.forEach((elem) => {
                columns.element.append(columnView.render(elem.title, elem.boardId, elem._id));
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        createColumnBtn.element.addEventListener('click', async () => {
            const inputValue = createColumnInput.element.value;
            await boardController.addColumn(token, boardid, inputValue, 0);
        });

        return board.element;
    }
}

export default new BoardView();
