import { Control } from "../../utils/Control";
import loginController from "../controller/login.controller";

class LoginView {
    render(): HTMLFormElement {
        const form = new Control<HTMLFormElement>('form','login-form');
        const title = new Control<HTMLElement>('h2', 'form-title');
        const login = new Control<HTMLInputElement>('input', 'input-login');
        const pass = new Control<HTMLInputElement>('input', 'input-pass');
        const submit = new Control<HTMLButtonElement>('button', 'button__submit-login');
        const or = new Control<HTMLElement>('p', 'or');
        const reg = new Control<HTMLLinkElement>('a', 'reg');
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
        submit.element.addEventListener('click', (event) => {
            event.preventDefault();
            loginController.loginUser(
                login.element.value,
                pass.element.value
            )
        })
        or.element.textContent = 'or';
        or.append(form.element);
        reg.element.textContent = 'Register accaunt';
        reg.element.href = '/auth?type=signup';
        reg.append(form.element);
        
        return form.element;
    }
}

export default new LoginView();