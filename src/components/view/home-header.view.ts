import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import homeHeaderController from '../controller/home-header.controller';

class HomeHeaderView {
    render(): HTMLElement {
        const header = new Control<HTMLElement>('header', 'home-header');
        const title = new Control<HTMLLinkElement>('a', 'title');
        const links = new Control<HTMLUListElement>('ul', 'links-header');
        const signUp = new Control<HTMLElement>('li', 'signup-link');
        const signUpLink = new Control<HTMLLinkElement>('a', 'signup-link-a');
        const logIn = new Control<HTMLElement>('li', 'login-link');
        const logInLink = new Control<HTMLLinkElement>('a', 'login-link-a');
        const workspace = new Control<HTMLElement>('li', 'workspace-link');
        const workspaceLink = new Control<HTMLLinkElement>('a', 'workspace-link-a');
        const logOut = new Control<HTMLElement>('li', 'logout-link');
        const logOutLink = new Control<HTMLLinkElement>('a', 'logout-link-a');
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
                homeHeaderController.logOut();
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
