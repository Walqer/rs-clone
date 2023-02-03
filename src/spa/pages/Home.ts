import footerView from '../../components/view/footer.view';
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
        const { body } = document;
        document.body.innerHTML = `
        <header class="home-header">
            <a href="/">Task manager</a>
            <ul class="links-header">
                <li class="signup-link"><a href="/auth?type=signup">Sign up</a></li>
                <li class="login-link"><a href="/auth?type=login">Log in</a></li>
            </ul>
        </header>
        <main class="home-content">
            <div class="greating">
                <h2 class="h2-greating">Task manager brings all your tasks, teammates, and tools together</h2><br>
                <p class="p-greating">Keep everything in the same place—even if your team isnt</p><br>
                <div class="home-auth">
                    <input type="text" placeholder="Login">
                    <button>Sign Up!</button>
                </div>
            </div>
        </main>
        `;
        body.append(footerView.render());
    }
}
