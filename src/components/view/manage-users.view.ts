/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import boardController from '../controller/board.controller';

class ManageUsersView {
    render() {
        const modal = new Control<HTMLElement>('div', 'users-modal__content');
        const modalContent = new Control<HTMLElement>('div', 'users-modal__content__wrapper');
        modalContent.append(modal.element);

        const owner = new Control<HTMLElement>('h3', 'users-modal__title');
        owner.append(modalContent.element);
        owner.element.innerText = 'Owner';
        let userItem = new Control<HTMLElement>('div', 'users-modal__user');
        userItem.append(modalContent.element);
        if (state.boardOwner) userItem.element.innerText = `${state.boardOwner.login as string} - ${state.boardOwner.name as string}`;

        const users = new Control<HTMLElement>('h3', 'users-modal__title');
        users.append(modalContent.element);
        users.element.innerText = 'Users';
        // eslint-disable-next-line no-restricted-syntax
        for (const user of state.boardUsers) {
            userItem = new Control<HTMLElement>('div', 'users-modal__user');
            const checkbox = `<label class="checkbox-container">
                                <input type="checkbox" value="${user._id as string}" checked ${user._id === state.userId ? 'disabled' : ''}>
                                <div class="checkmark"></div>
                              </label>
                              <span>${user.login as string} - ${user.name as string}</span>`;
            userItem.append(modalContent.element);
            userItem.element.innerHTML = checkbox;
        }

        const restUsers = new Control<HTMLElement>('h3', 'users-modal__title');
        restUsers.append(modalContent.element);
        restUsers.element.innerText = 'Add Users';
        // eslint-disable-next-line no-restricted-syntax
        for (const user of state.notBoardUsers) {
            userItem = new Control<HTMLElement>('div', 'users-modal__user');
            const checkbox = `<label class="checkbox-container">
                                <input type="checkbox" value="${user._id as string}">
                                <div class="checkmark"></div>
                              </label>
                              <span>${user.login as string} - ${user.name as string}</span>`;
            userItem.append(modalContent.element);
            userItem.element.innerHTML = checkbox;
        }

        const modalFooter = new Control<HTMLElement>('div', 'users-modal__content__footer');
        modalFooter.append(modal.element);
        const usersButton = new Control<HTMLButtonElement>('button', 'white-button');
        usersButton.append(modalFooter.element);
        usersButton.element.innerHTML = 'Save';
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        usersButton.element.addEventListener('click', async () => {
            const checkedElements = document.querySelectorAll('.checkbox-container input[type="checkbox"]:checked');
            const checkedUsers = Array.from(checkedElements).map((x) => (x as HTMLInputElement).value);
            await boardController.saveBoardUsers(checkedUsers);
            await boardController.getBoardUsers();
            this.update();
        });

        return modal.element;
    }

    update() {
        const newData = this.render();
        const oldData = document.querySelector('.users-modal__content') as HTMLDivElement;
        oldData.replaceWith(newData);
    }
}

export default new ManageUsersView();
