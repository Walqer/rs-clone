import { state } from '../../store/state';
import { Control } from '../../utils/Control';

class SignUpWidget {
    render(): HTMLFormElement {
        const auth = new Control<HTMLFormElement>('form', 'home-content__greating-widget');
        if (!state.token) {
            const logInInput = new Control<HTMLInputElement>('input', 'home-content__greating-widget_input');
            const signUpBtn = new Control<HTMLButtonElement>('button', 'home-content__greating-widget_submit', 'blue-button');
            logInInput.element.type = 'text';
            logInInput.element.placeholder = 'Login';
            logInInput.append(auth.element);
            signUpBtn.element.innerHTML = 'Sign Up!';
            signUpBtn.append(auth.element);
            signUpBtn.element.addEventListener('click', (event) => {
                event.preventDefault();
                if (logInInput.element.value) {
                    window.location.href = `/auth?type=signup&login=${logInInput.element.value}`;
                } else {
                    window.location.href = `/auth?type=signup`;
                }
            });
        }
        return auth.element;
    }
}

export default new SignUpWidget();
