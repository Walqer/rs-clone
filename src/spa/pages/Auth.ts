import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';
import loginView from '../../components/view/login.view';
import footerView from '../../components/view/footer.view';
import signupView from '../../components/view/signup.view';

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
        const { body } = document
        document.body.innerHTML = `
        <main class="auth-content">
            <h2>Task manager</h2>
        </main>
        `;
        const main = document.querySelector('.auth-content') as HTMLElement;
        if (params.get('type') === 'login') main.append(loginView.render());
        else if (params.get('type') === 'signup') main.append(signupView.render());
        body.append(footerView.render());
    }
}
