import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import preloader from '../../utils/Preloader';
import { validation } from '../../utils/Validation';
import loginController from '../controller/login.controller';

class LoginView {
    render(): HTMLFormElement {
        const form = new Control<HTMLFormElement>('form', 'auth__form', 'form__login');
        const title = new Control<HTMLElement>('h2', 'auth__form-title');
        const loginBox = new Control<HTMLInputElement>('div', 'auth__form-input-box');
        const login = new Control<HTMLInputElement>('input', 'auth__form-input', 'input-text');
        const passBox = new Control<HTMLInputElement>('div', 'auth__form-input-box');
        const pass = new Control<HTMLInputElement>('input', 'auth__form-input', 'input-text');
        const submit = new Control<HTMLButtonElement>('button', 'auth__form-submit', 'white-button');
        const or = new Control<HTMLElement>('p', 'auth__form-text-or');
        const reg = new Control<HTMLLinkElement>('a', 'auth__form-text-reg');
        const err = new Control<HTMLElement>('p', 'auth_server-error');
        form.element.action = '';
        title.element.textContent = 'Login to Task manager';
        title.append(form.element);
        loginBox.append(form.element);
        login.element.type = 'text';
        login.element.placeholder = 'Enter login';
        login.element.dataset.minLength = '3';
        login.element.dataset.maxLength = '16';
        login.append(loginBox.element);
        passBox.append(form.element);
        pass.element.type = 'password';
        pass.element.placeholder = 'Enter password';
        pass.element.dataset.minLength = '3';
        pass.element.dataset.maxLength = '32';
        pass.append(passBox.element);
        submit.element.textContent = 'Log in';
        submit.append(form.element);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        submit.element.addEventListener('click', async (event) => {
            event.preventDefault();
            const isValid = validation();
            if (isValid) {
                preloader.start();
                await loginController.loginUser(login.element.value, pass.element.value);
                this.update();
                preloader.stop();
            }
        });
        err.element.textContent = state.authError as string;
        err.append(form.element);
        or.element.textContent = 'or';
        or.append(form.element);
        reg.element.textContent = 'Register accaunt';
        reg.element.dataset.link = '';
        reg.element.href = '/auth?type=signup';
        reg.append(form.element);
        return form.element;
    }

    update() {
        const newData = this.render();
        const oldData = document.querySelector('.form__login') as HTMLFormElement;
        oldData.replaceWith(newData);
    }
}

export default new LoginView();
