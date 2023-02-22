import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import { validation } from '../../utils/Validation';
import signUpController from '../controller/signup.controller';
import preloader from '../../utils/Preloader';

class SignUpView {
    render(): HTMLFormElement {
        const form = new Control<HTMLFormElement>('form', 'auth__form', 'form__signup');
        const title = new Control<HTMLElement>('h2', 'auth__form-title');
        const nameBox = new Control<HTMLInputElement>('div', 'auth__form-input-box');
        const name = new Control<HTMLInputElement>('input', 'auth__form-input');
        const loginBox = new Control<HTMLInputElement>('div', 'auth__form-input-box');
        const login = new Control<HTMLInputElement>('input', 'auth__form-input');
        const passBox = new Control<HTMLInputElement>('div', 'auth__form-input-box');
        const pass = new Control<HTMLInputElement>('input', 'auth__form-input');
        const passRepitBox = new Control<HTMLInputElement>('div', 'auth__form-input-box');
        const passRepit = new Control<HTMLInputElement>('input', 'auth__form-input');
        const submit = new Control<HTMLButtonElement>('button', 'auth__form-submit');
        const or = new Control<HTMLElement>('p', 'auth__form-text-or');
        const log = new Control<HTMLLinkElement>('a', 'auth__form-text-log');
        const err = new Control<HTMLElement>('p', 'auth_error');
        form.element.action = '';
        title.element.textContent = 'Account registration';
        title.append(form.element);
        nameBox.append(form.element);
        name.element.type = 'text';
        name.element.placeholder = 'Enter name';
        name.element.dataset.minLength = '3';
        name.element.dataset.maxLength = '16';
        name.append(nameBox.element);
        loginBox.append(form.element);
        login.element.type = 'text';
        const params: URLSearchParams = new URLSearchParams(document.location.search);
        if (params.get('login')) {
            login.element.value = params.get('login') as string;
        }
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
        passRepitBox.append(form.element);
        passRepit.element.type = 'password';
        passRepit.element.placeholder = 'Repeat password';
        pass.element.dataset.minLength = '3';
        pass.element.dataset.maxLength = '32';
        passRepit.append(passRepitBox.element);
        submit.element.textContent = 'Register';
        submit.append(form.element);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        submit.element.addEventListener('click', async (event) => {
            event.preventDefault();
            passRepit.element.dataset.isRepeat = pass.element.value;
            const isValid = validation();
            if (isValid) {
                preloader.start();
                await signUpController.registerUser(name.element.value, login.element.value, pass.element.value);
                this.update();
                preloader.stop();
            }
        });
        err.element.textContent = state.authError as string;
        err.append(form.element);
        or.element.textContent = 'or';
        or.append(form.element);
        log.element.textContent = 'Log in';
        log.element.href = '/auth?type=login';
        log.append(form.element);

        return form.element;
    }

    update() {
        const newData = this.render();
        const oldData = document.querySelector('.form__signup') as HTMLFormElement;
        oldData.replaceWith(newData);
    }
}

export default new SignUpView();
