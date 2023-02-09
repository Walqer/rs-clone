import { getBoardById } from '../../api/boards';
import headerView from '../../components/view/header.view';
import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class BoardPage extends AbstractView {
    boardID: string;

    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Board');
        this.boardID = this.params.type;
    }

    async getHtml() {
        return `
      <h1 class="main-title visually-hidden">Board</h1>`;
    }

    async mounted() {
        const { token } = state;
        if (token) {
            const board = await getBoardById(token, this.boardID);
            if (board === 'Board was not founded!') window.location.href = '/404';
        } else {
            throw new Error('invalid token');
        }
        const { body } = document;
        body.append(headerView.render());
        const board = new Control<HTMLElement>('div', 'board');
        const header = new Control<HTMLElement>('div', 'board__header');
        const title = new Control<HTMLElement>('h2', 'board__header-title');
        const search = new Control<HTMLElement>('div', 'board__header-search');
        const columns = new Control<HTMLElement>('div', 'board__columns');
        const column = new Control<HTMLElement>('div', 'board__columns-column');
        column.element.classList.add('column');
        const columnTitle = new Control<HTMLElement>('h3', 'column__title');
        const createColumn = new Control<HTMLElement>('div', 'board__columns-column_create');
        const tasks = new Control<HTMLElement>('div', 'column__tasks');

        board.append(body);
        header.append(board.element);
        title.append(header.element);
        search.append(header.element);
        columns.append(board.element);
        column.append(columns.element);
        columnTitle.append(column.element);
        tasks.append(column.element);
        createColumn.append(columns.element);

        title.element.textContent = 'Board';
        columnTitle.element.textContent = 'Name column';
        createColumn.element.textContent = 'create column';
    }
}
