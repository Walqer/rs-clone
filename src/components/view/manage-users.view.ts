import { state } from '../../store/state';
import { Control } from '../../utils/Control';

class ManageUsersView {
    render() {
        const modalContent = new Control<HTMLElement>('div', 'users-modal__content');

        const owner = new Control<HTMLElement>('h3', 'users-modal__title');
        owner.append(modalContent.element);
        owner.element.innerText = 'Owner';
        let userItem = new Control<HTMLElement>('div', 'users-modal__user');
        userItem.append(modalContent.element);
        userItem.element.innerText = state.boardOwner!.name;

        const users = new Control<HTMLElement>('h3', 'users-modal__title');
        users.append(modalContent.element);
        users.element.innerText = 'Users';
        // eslint-disable-next-line no-restricted-syntax
        for (const user of state.boardUsers) {
            userItem = new Control<HTMLElement>('div', 'users-modal__user');
            userItem.append(modalContent.element);
            userItem.element.innerText = user.name;
        }

        const restUsers = new Control<HTMLElement>('h3', 'users-modal__title');
        restUsers.append(modalContent.element);
        restUsers.element.innerText = 'Add Users';
        // eslint-disable-next-line no-restricted-syntax
        for (const user of state.notBoardUsers) {
            userItem = new Control<HTMLElement>('div', 'users-modal__user');
            userItem.append(modalContent.element);
            userItem.element.innerText = user.name;
        }

        return modalContent.element;
    }

    update() {
        const newData = this.render();
        const oldData = document.querySelector('.users-modal') as HTMLFormElement;
        oldData.replaceWith(newData);
    }
}

export default new ManageUsersView();
