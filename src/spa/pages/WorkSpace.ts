import headerView from '../../components/view/header.view';
import boardsListView from '../../components/view/boardsList.view';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';
import footerView from '../../components/view/footer.view';

export class WorkSpace extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('WorkSpace');
    }

    async getHtml() {
        return `
      <h1 class="main-title visually-hidden">WorkSpace</h1>`;
    }

    async mounted() {
        const { body } = document;
        body.append(headerView.render());
        body.append(await boardsListView.render());
        body.append(footerView.render());
    }
}
