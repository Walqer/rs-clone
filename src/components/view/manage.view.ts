import { Control } from '../../utils/Control';

class ManageView {
    render() {
        const form = new Control<HTMLFormElement>('form', 'auth__form', 'form__manage');
        const title = new Control<HTMLElement>('h2', 'auth__form-title');

        const nameBox = new Control<HTMLElement>('div', 'auth__form-name-box');
        const nameTitle = new Control<HTMLElement>('p', 'auth-form-name-title');
        const nameInput = new Control<HTMLInputElement>('input', 'auth__form-name-input');

        const loginBox = new Control<HTMLElement>('div', 'auth__form-login-box');
        const loginTitle = new Control<HTMLElement>('p', 'auth-form-login-title');
        const loginInput = new Control<HTMLInputElement>('input', 'auth__form-login-input');

        const passChangeTitle = new Control<HTMLElement>('h2', 'auth__form-change-pass-title');

        const passCurrentBox = new Control<HTMLElement>('div', 'auth__form-current-pass-box');
        const passCurrentTitle = new Control<HTMLElement>('p', 'auth-form-current-pass-title');
        const passCurrentInput = new Control<HTMLInputElement>('input', 'auth__form-current-pass-input');

        const passNewBox = new Control<HTMLElement>('div', 'auth__form-new-pass-box');
        const passNewTitle = new Control<HTMLElement>('p', 'auth-form-new-pass-title');
        const passNewInput = new Control<HTMLInputElement>('input', 'auth__form-new-pass-input');

        const passSave = new Control<HTMLButtonElement>('button', 'auth__form-pass-save');

        form.element.action = '';

        title.element.textContent = 'Your profile';
        title.append(form.element);

        nameBox.append(form.element);
        nameTitle.element.textContent = 'Name:';
        nameTitle.append(nameBox.element);
        nameInput.element.value = 'VDVFsd';
        nameInput.append(nameBox.element);

        loginBox.append(form.element);
        loginTitle.element.textContent = 'Login:';
        loginTitle.append(nameBox.element);
        loginInput.element.value = '28189';
        loginInput.append(nameBox.element);

        passChangeTitle.element.textContent = 'Change password';
        passChangeTitle.append(form.element);

        passCurrentBox.append(form.element);
        passCurrentTitle.element.textContent = 'Current password:';
        passCurrentTitle.append(passCurrentBox.element);
        passCurrentInput.element.placeholder = 'Enter current password';
        passCurrentInput.append(passCurrentBox.element);

        passNewBox.append(form.element);
        passNewTitle.element.textContent = 'New password:';
        passNewTitle.append(passNewBox.element);
        passNewInput.element.placeholder = 'Enter new password';
        passNewInput.append(passNewBox.element);

        passSave.element.textContent = 'Save changes';
        passSave.append(form.element);

        return form.element;
    }
}

export default new ManageView();
