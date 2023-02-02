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
        <header class="header">
            <div>Task manager</div>
            <ul class="auth__header">
                <li class="sign-up__auth"><a href="/auth">Sign up</a></li>
                <li class="log-in__auth"><a href="/auth">Log in</a></li>
            </ul>
        </header>
        <main class="content">
            <div class="greating__content">
                <p>Task manager brings all your tasks, teammates, and tools together</p>
                <p>Keep everything in the same place—even if your team isnt</p>
                <div class="greating__auth">
                    <input type="email" name="email" id="emai">
                    <button>Sign Up!</button>
                </div>
            </div>
        </main>
        <footer class="footer">
            <img class="rss-logo" src="../../assets/icons/rsslogo.png" alt="RSSLogo">
            <div>2023</div>
            <img class="github-logo" src="../../assets/icons/github-logo.png" alt="GitHubLogo">
        </footer>
        `;
    }
}
