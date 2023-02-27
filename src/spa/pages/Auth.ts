import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';
import loginView from '../../components/view/login.view';
import footerView from '../../components/view/footer.view';
import signupView from '../../components/view/signup.view';
import { Control } from '../../utils/Control';
import manageView from '../../components/view/manage.view';
import homeHeaderView from '../../components/view/home-header.view';

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
        if (localStorage.getItem('token')) {
            document.location = '/workspace';
        }
        const params: URLSearchParams = new URLSearchParams(document.location.search);
        const { body } = document;
        const main = new Control<HTMLElement>('main', 'auth');
        const header = new Control<HTMLElement>('header', 'auth__header');
        body.append(homeHeaderView.render());
        main.append(body);
        header.append(main.element);
        if (params.get('type') === 'login') main.element.append(loginView.render());
        else if (params.get('type') === 'signup') main.element.append(signupView.render());
        else if (params.get('type') === 'manage') main.element.append(await manageView.render());
        body.append(main.element);
        body.append(footerView.render());
    }
}
