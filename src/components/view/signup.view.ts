// export function renderSignupForm() {
//     return `
//     <form class="auth-form signup-form">
//         <h2>Account registration</h2>
//         <input type="text" placeholder="Enter login" required >
//         <input type="password" placeholder="Enter password" required >
//         <input type="password" placeholder="Repeat password" required >
//         <button type="submit">Register</button>
//         <p align="center">or</p>
//         <a align="center"  href="/auth?type=login">Log in</a>
//     </form>`;
// }

import { Control } from "../../utils/Control";
import signupController from "../controller/signup.controller";

class SignupView {
    render(): HTMLFormElement {
        const form = new Control<HTMLFormElement>('form','signup-form');
        const title = new Control<HTMLElement>('h2', 'form-title');
        const name = new Control<HTMLInputElement>('input', 'input-name')
        const login = new Control<HTMLInputElement>('input', 'input-login');
        const pass = new Control<HTMLInputElement>('input', 'input-pass');
        const passRepit = new Control<HTMLInputElement>('input', 'input-pass-repit');
        const submit = new Control<HTMLButtonElement>('button', 'button__submit-login');
        const or = new Control<HTMLElement>('p', 'or');
        const log = new Control<HTMLLinkElement>('a', 'log');
        form.element.classList.add('auth-form');
        title.element.textContent = 'Account registration';
        title.append(form.element);
        name.element.type = 'text';
        name.element.placeholder = 'Enter name';
        name.element.required = true;
        name.append(form.element);
        login.element.type = 'text';
        login.element.placeholder = 'Enter login';
        login.element.required = true;
        login.append(form.element);
        pass.element.type = 'password';
        pass.element.placeholder = 'Enter password';
        pass.element.required = true;
        passRepit.element.type = 'password';
        passRepit.element.placeholder = 'Repeat password';
        passRepit.element.required = true;
        pass.append(form.element);
        passRepit.append(form.element);
        submit.element.textContent = 'Register';
        submit.append(form.element);
        submit.element.addEventListener('click', (event) => {
            event.preventDefault();
            signupController.registerUser(
                name.element.value,
                login.element.value,
                pass.element.value
            )
        });
        or.element.textContent = 'or';
        or.append(form.element);
        log.element.textContent = 'Log in';
        log.element.href = '/auth?type=login';
        log.append(form.element);
        
        return form.element;
    }
}

export default new SignupView();
