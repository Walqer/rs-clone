import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import loginController from '../controller/login.controller';

class LoginView {
    render(): HTMLFormElement {
        const update = () => {
            const newData = this.render();
            const oldData = document.querySelector('.login-form') as HTMLFormElement;
            oldData.replaceWith(newData);
        };
        const form = new Control<HTMLFormElement>('form', 'login-form');
        const title = new Control<HTMLElement>('h2', 'form-title');
        const login = new Control<HTMLInputElement>('input', 'input-login');
        const pass = new Control<HTMLInputElement>('input', 'input-pass');
        const submit = new Control<HTMLButtonElement>('button', 'button__submit-login');
        const or = new Control<HTMLElement>('p', 'or');
        const reg = new Control<HTMLLinkElement>('a', 'reg');
        const err = new Control<HTMLElement>('p', 'error-message');
        form.element.classList.add('auth-form');
        title.element.textContent = 'Login to Task manager';
        title.append(form.element);
        login.element.type = 'text';
        login.element.placeholder = 'Enter login';
        login.element.required = true;
        login.append(form.element);
        pass.element.type = 'password';
        pass.element.placeholder = 'Enter password';
        pass.element.required = true;
        pass.append(form.element);
        submit.element.textContent = 'Log in';
        submit.append(form.element);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        submit.element.addEventListener('click', async (event) => {
            event.preventDefault();
            await loginController.loginUser(login.element.value, pass.element.value, update);
        });
        err.element.textContent = state.authError as string;
        err.append(form.element);
        or.element.textContent = 'or';
        or.append(form.element);
        reg.element.textContent = 'Register accaunt';
        reg.element.href = '/auth?type=signup';
        reg.append(form.element);

        return form.element;
    }
}

export default new LoginView();
