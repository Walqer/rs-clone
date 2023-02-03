import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';
import loginView from '../../components/view/login.view';
import footerView from '../../components/view/footer.view';

export class Auth extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Authentication');
    }

    async getHtml() {
        return `
        <h1 class="main-title visually-hidden">Authentication</h1>`;
    }

    async mounted() {
        const params: URLSearchParams = new URLSearchParams(document.location.search);
        const { body } = document;
        if (params.get('type') === 'login') body.append(loginView.render());
        else if (params.get('type') === 'signup') body.append(loginView.render());
        body.append(footerView.render());
    }
}
