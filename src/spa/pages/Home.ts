import { renderFooter } from '../../components/view/footer';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Home extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Home');
    }

    async getHtml() {
        return `
        <h1 class="main-title">Home</h1>`;
    }

    async mounted() {
        document.body.innerHTML = `
        <header class="home-header">
            <div>Task manager</div>
            <ul class="links-header">
                <li class="sign-up__link"><a href="/auth?type=signup">Sign up</a></li>
                <li class="log-in__link"><a href="/auth?type=login">Log in</a></li>
            </ul>
        </header>
        <main class="home-content">
            <div class="greating-content">
                <p>Task manager brings all your tasks, teammates, and tools together</p>
                <p>Keep everything in the same place—even if your team isnt</p>
                <div class="greating-auth">
                    <input type="email" name="email" id="emai">
                    <button>Sign Up!</button>
                </div>
            </div>
        </main>
        ${renderFooter()}
        `;
    }
}
