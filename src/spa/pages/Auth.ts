import { renderFooter } from '../../components/view/footer';
import { renderLoginForm } from '../../components/view/login';
import { renderSignupForm } from '../../components/view/signup';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Auth extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Authentication');
    }

    async getHtml() {
        return `
        <h1 class="main-title">Authentication</h1>`;
    }

    async mounted() {
        const params: URLSearchParams = new URLSearchParams(document.location.search);
        let inner = '';
        if (params.get('type') === 'login') inner = renderLoginForm();
        else if (params.get('type') === 'signup') inner = renderSignupForm();
        document.body.innerHTML = `
        <main class="auth-content">
            <h2>Task manager</h2>
            ${inner}
        </main>
        ${renderFooter()}
        `;
    }
}
