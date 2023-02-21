import { compareHashPassword } from '../../api/apiUtils';
import { User } from '../../spa/types';
import { Control } from '../../utils/Control';
import manageController from '../controller/manage.controller';

class ManageView {
    async render() {
        const form = new Control<HTMLFormElement>('form', 'auth__form', 'form__manage');
        const title = new Control<HTMLElement>('h2', 'auth__form-title');

        const loginBox = new Control<HTMLElement>('div', 'auth__form-login-box');
        const loginTitle = new Control<HTMLElement>('p', 'auth-form-login-title');
        const loginValue = new Control<HTMLInputElement>('p', 'auth__form-login-value');

        const nameBox = new Control<HTMLElement>('div', 'auth__form-name-box');
        const nameTitle = new Control<HTMLElement>('p', 'auth-form-name-title');
        const nameInput = new Control<HTMLInputElement>('input', 'auth__form-name-input');
        const nameEdit = new Control<HTMLImageElement>('img', 'auth__form-name-edit');

        const passChangeTitle = new Control<HTMLElement>('h2', 'auth__form-change-pass-title');

        const passCurrentBox = new Control<HTMLElement>('div', 'auth__form-current-pass-box');
        const passCurrentTitle = new Control<HTMLElement>('p', 'auth-form-current-pass-title');
        const passCurrentInput = new Control<HTMLInputElement>('input', 'auth__form-input');

        const passNewBox = new Control<HTMLElement>('div', 'auth__form-new-pass-box');
        const passNewTitle = new Control<HTMLElement>('p', 'auth-form-new-pass-title');
        const passNewInput = new Control<HTMLInputElement>('input', 'auth__form-input');

        const passSave = new Control<HTMLButtonElement>('button', 'auth__form-pass-save');

        const currentUser = (await manageController.getUserById()) as User;

        form.element.action = '';

        title.element.textContent = 'Your profile';
        title.append(form.element);

        loginBox.append(form.element);
        loginTitle.element.textContent = 'Login:';
        loginTitle.append(loginBox.element);
        loginValue.element.textContent = currentUser.login;
        loginValue.append(loginBox.element);

        nameBox.append(form.element);
        nameTitle.element.textContent = 'Name:';
        nameTitle.append(nameBox.element);
        nameInput.element.value = currentUser.name;
        nameInput.element.disabled = true;
        nameInput.append(nameBox.element);
        nameEdit.element.src = '../../assets/icons/edit.png';
        nameEdit.append(nameBox.element);

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

        nameEdit.element.addEventListener('click', () => {
            nameEdit.element.classList.add('auth__form-name-edit_hide');
            nameInput.element.disabled = false;
            nameInput.element.select();
            const nameConfirm = new Control<HTMLElement>('div', 'auth__form-name-confirm');
            const nameConfirmInput = new Control<HTMLInputElement>('input', 'auth__form-name-confirm-input');
            const nameConfirmBtnYes = new Control<HTMLButtonElement>('button', 'auth__form-name-confirm-button_yes');
            const nameConfirmBtnNo = new Control<HTMLButtonElement>('button', 'auth__form-name-confirm-button_no');
            nameConfirm.append(nameBox.element);
            nameConfirmInput.element.type = 'password';
            nameConfirmInput.element.placeholder = 'Enter your password';
            nameConfirmInput.append(nameConfirm.element);
            nameConfirmBtnYes.element.textContent = 'yes';
            nameConfirmBtnYes.append(nameConfirm.element);
            nameConfirmBtnNo.element.textContent = 'no';
            nameConfirmBtnNo.append(nameConfirm.element);
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            nameConfirmBtnYes.element.addEventListener('click', async (event) => {
                event.preventDefault();
                nameInput.element.disabled = true;
                const hash = localStorage.getItem('hash') as string;
                const pass = nameConfirmInput.element.value;
                const isTruePass = compareHashPassword(pass, hash);
                if (isTruePass) {
                    await manageController.updateUserById(nameInput.element.value, currentUser.login, pass);
                    nameConfirm.remove();
                    nameEdit.element.classList.remove('auth__form-name-edit_hide');
                } else {
                    console.log('Error');
                }
            });
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            nameConfirmBtnNo.element.addEventListener('click', async () => {
                nameEdit.element.classList.remove('auth__form-name-edit_hide');
                nameInput.element.value += ' ';
                nameInput.element.value = nameInput.element.value.slice(0, -1);
                nameInput.element.disabled = true;
                nameConfirm.remove();
            });
        });

        passSave.element.addEventListener('click', (event) => {
            event.preventDefault();
        });

        return form.element;
    }
}

export default new ManageView();
