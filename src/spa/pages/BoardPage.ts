import { getBoardById } from '../../api/boards';
import boardView from '../../components/view/board.view';
import footerView from '../../components/view/footer.view';
import headerView from '../../components/view/header.view';
import { state } from '../../store/state';
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
            else state.boardId = this.boardID;
        } else {
            throw new Error('invalid token');
        }
        const { body } = document;
        body.append(headerView.render());
        body.append(await boardView.render());
        body.append(footerView.render());
    }
}
