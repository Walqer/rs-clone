import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import homeHeaderController from '../controller/home-header.controller';

class HomeHeaderView {
    render(): HTMLElement {
        const update = () => {
            const newData = this.render();
            const oldData = document.querySelector('.home-header') as HTMLElement;
            oldData.replaceWith(newData);
        };
        const header = new Control<HTMLElement>('header', 'home-header');
        const title = new Control<HTMLLinkElement>('a', 'home-header__title');
        const links = new Control<HTMLUListElement>('ul', 'home-header__list');
        const signUp = new Control<HTMLElement>('li', 'home-header__list-item');
        const signUpLink = new Control<HTMLLinkElement>('a', 'home-header__list-item-link');
        const logIn = new Control<HTMLElement>('li', 'home-header__list-item');
        const logInLink = new Control<HTMLLinkElement>('a', 'home-header__list-item-link');
        const workspace = new Control<HTMLElement>('li', 'home-header__list-item');
        const workspaceLink = new Control<HTMLLinkElement>('a', 'home-header__list-item-link');
        const logOut = new Control<HTMLElement>('li', 'home-header__list-item');
        const logOutLink = new Control<HTMLLinkElement>('a', 'home-header__list-item-link');
        title.element.textContent = 'Task manager';
        title.append(header.element);
        links.append(header.element);
        if (state.token) {
            workspace.append(links.element);
            workspaceLink.element.href = '/workspace';
            workspaceLink.element.textContent = 'Workspace';
            workspaceLink.append(workspace.element);
            logOut.append(links.element);
            logOutLink.element.textContent = 'Log out';
            logOutLink.append(logOut.element);
            logOutLink.element.addEventListener('click', () => {
                homeHeaderController.logOut(update);
            });
        } else {
            signUp.append(links.element);
            signUpLink.element.href = '/auth?type=signup';
            signUpLink.element.textContent = 'Sign up';
            signUpLink.append(signUp.element);
            logIn.append(links.element);
            logInLink.element.href = '/auth?type=login';
            logInLink.element.textContent = 'Log in';
            logInLink.append(logIn.element);
        }
        return header.element;
    }
}

export default new HomeHeaderView();
