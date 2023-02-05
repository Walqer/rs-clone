import { getBoardById } from '../../api/boards';
import headerView from '../../components/view/header.view';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class BoardPage extends AbstractView {
    boardID: string;

    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('WorkSpace');
        this.boardID = this.params.type;
    }

    async getHtml() {
        return `
      <h1 class="main-title visually-hidden">Board</h1>`;
    }

    async mounted() {
        const { body } = document;
        body.append(headerView.render());
        const board = await getBoardById(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGU4YmE5ODk4MjVhYWFmMGU2MDQxMiIsImxvZ2luIjoiQWxpbXVzaW0iLCJpYXQiOjE2NzU1NzMzOTcsImV4cCI6MTY3NTYxNjU5N30.jzhPVXmg1MpMUcE3TPi0gSCeVpnTY6e_781bFPh-U6k',
            this.boardID
        );
        if (board === 'Board was not founded!') window.location.href = '/404';
    }
}
