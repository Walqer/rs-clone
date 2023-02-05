import footerView from '../../components/view/footer.view';
import { Control } from '../../utils/Control';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Home extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Home');
    }

    async getHtml() {
        return `
        <h1 class="main-title visually-hidden">Home</h1>`;
    }

    async mounted() {
        const { body } = document;
        const header = new Control<HTMLElement>('header', 'home-header');
        const title = new Control<HTMLLinkElement>('a', 'title');
        const links = new Control<HTMLUListElement>('ul', 'links-header');
        const signUp = new Control<HTMLElement>('li', 'signup-link');
        const signUpLink = new Control<HTMLLinkElement>('a', 'signup-link-a');
        const logIn = new Control<HTMLElement>('li', 'login-link');
        const logInLink = new Control<HTMLLinkElement>('a', 'login-link-a');
        header.append(body);
        title.element.textContent = 'Task manager';
        title.append(header.element);
        links.append(header.element);
        signUp.append(links.element);
        signUpLink.element.href = '/auth?type=signup';
        signUpLink.element.textContent = 'Sign up';
        signUpLink.append(signUp.element);
        logIn.append(links.element);
        logInLink.element.href = '/auth?type=login';
        logInLink.element.textContent = 'Log in';
        logInLink.append(logIn.element);

        const main = new Control<HTMLElement>('main', 'home-content');
        const greating = new Control<HTMLElement>('div', 'greating');
        const h2 = new Control<HTMLElement>('h2', 'h2-ggreating');
        const p = new Control<HTMLElement>('p', 'p-greating');
        const auth = new Control<HTMLElement>('div', 'home-auth');
        const logInInput = new Control<HTMLInputElement>('input', 'signup-input');
        const signUpBtn = new Control<HTMLButtonElement>('button', 'signup-button');
        main.append(body);
        greating.append(main.element);
        h2.element.innerHTML = 'Task manager brings all your tasks, teammates, and tools together<br><br>';
        h2.append(greating.element);
        p.element.innerHTML = 'Keep everything in the same place—even if your team isnt<br><br>';
        p.append(greating.element);
        auth.append(greating.element);
        logInInput.element.type = 'text';
        logInInput.element.placeholder = 'Login';
        logInInput.append(auth.element);
        signUpBtn.element.innerHTML = 'Sign Up!';
        signUpBtn.append(auth.element);

        body.append(footerView.render());
    }
}
