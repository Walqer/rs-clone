import footerView from '../../components/view/footer.view';
import homeHeaderView from '../../components/view/home-header.view';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Page404 extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('404 Not Found');
    }

    async getHtml() {
        return `
      <h1 class="main-title visually-hidden">404 - Page not found</h1>
    `;
    }

    async mounted() {
        const { body } = document;
        body.append(homeHeaderView.render());
        const img = `<img src="../assets/img/not-found.png" class="not-found-image">`;
        body.insertAdjacentHTML('beforeend', img);
        body.append(footerView.render());
    }
}
