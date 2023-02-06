import { state } from '../../store/state';
import { Control } from '../../utils/Control';

class SignUpWidget {
    render(): HTMLFormElement {
        const auth = new Control<HTMLFormElement>('form', 'home-auth');
        if (!state.token) {
            const logInInput = new Control<HTMLInputElement>('input', 'signup-input');
            const signUpBtn = new Control<HTMLButtonElement>('button', 'signup-button');
            logInInput.element.type = 'text';
            logInInput.element.placeholder = 'Login';
            logInInput.append(auth.element);
            signUpBtn.element.innerHTML = 'Sign Up!';
            signUpBtn.append(auth.element);
            signUpBtn.element.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = `http://localhost:8080/auth?type=signup&login=${logInInput.element.value}`;
            });
        }
        return auth.element;
    }
}

export default new SignUpWidget();
