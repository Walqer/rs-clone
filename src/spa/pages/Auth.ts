import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';
import loginView from '../../components/view/login.view';
import footerView from '../../components/view/footer.view';
import signupView from '../../components/view/signup.view';
import { Control } from '../../utils/Control';

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
        const main = new Control<HTMLElement>('main', 'auth');
        const title = new Control<HTMLElement>('h1', 'auth__title');
        main.append(body);
        title.append(main.element);
        title.element.textContent = 'Task manager';
        if (params.get('type') === 'login') main.element.append(loginView.render());
        else if (params.get('type') === 'signup') main.element.append(signupView.render());
        body.append(main.element);
        body.append(footerView.render());
    }
}
