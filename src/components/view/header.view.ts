import { state } from '../../store/state';
import { Control } from '../../utils/Control';
import headerController from '../controller/header.controller';

class HeaderView {
    render(): HTMLElement {
        const wrapper = new Control<HTMLElement>('div', 'header__wrapper');
        const header = new Control<HTMLElement>('header', 'header');
        const logo = new Control<HTMLLinkElement>('a', 'header__logo');
        const menu = new Control<HTMLElement>('nav', 'header__menu');
        const menuList = new Control<HTMLUListElement>('ul', 'header__menu-list');
        const menuLinks = [
            ['Workspace', '/workspace'],
            ['About Us', 'href'],
        ];
        const userBlock = new Control<HTMLDivElement>('div', 'header__user-block');
        const userIcon = new Control<HTMLImageElement>('img', 'header__user-block-img');
        const userInfo = new Control<HTMLSpanElement>('span', 'header__user-block-info');
        const userMenu = new Control<HTMLDivElement>('div', 'header__user-block-menu', 'header__user-block-menu_hide');
        const userMenuTitleAcc = new Control<HTMLElement>('h3', 'header__user-block-menu-title');
        const userMenuTitleSet = new Control<HTMLElement>('h3', 'header__user-block-menu-title');
        const userMenuInfo = new Control<HTMLElement>('div', 'header__user-block-menu-info');
        const userMenuImg = new Control<HTMLImageElement>('img', 'header__user-block-menu-img');
        const userMenuInfoContainer = new Control<HTMLElement>('div', 'header__user-block-menu-info-container');
        const userMenuInfoName = new Control<HTMLElement>('a', 'header__user-block-menu-info-name');
        const userMenuInfoLogin = new Control<HTMLElement>('a', 'header__user-block-menu-info-login');
        const userMenuLogOut = new Control<HTMLElement>('p', 'header__user-block-menu-logout');
        const curentUser = headerController.getUserInfo();

        header.append(wrapper.element);
        userInfo.element.textContent = curentUser.fullname;
        userInfo.append(userBlock.element);
        userIcon.element.src = curentUser.imgSrc;
        userIcon.append(userBlock.element);
        userMenu.append(userBlock.element);
        userMenuTitleAcc.element.textContent = 'Account';
        userMenuTitleAcc.append(userMenu.element);
        userMenuInfo.append(userMenu.element);
        userMenuImg.element.src = curentUser.imgSrc;
        userMenuImg.append(userMenuInfo.element);
        userMenuInfoContainer.append(userMenuInfo.element);
        userMenuInfoName.element.textContent = curentUser.fullname;
        userMenuInfoName.append(userMenuInfoContainer.element);
        userMenuInfoLogin.element.textContent = 'login';
        userMenuInfoLogin.append(userMenuInfoContainer.element);
        userMenuTitleSet.element.textContent = 'Manage account';
        userMenuTitleSet.append(userMenu.element);
        userMenuLogOut.element.textContent = 'Log out';
        userMenuLogOut.append(userMenu.element);

        logo.element.href = '/';
        logo.element.textContent = 'MiniTrello';
        logo.append(header.element);
        menu.append(header.element);
        userBlock.append(header.element);
        menuList.append(menu.element);

        menuLinks.forEach((item) => {
            const menuListItem = new Control<HTMLLIElement>('li', 'header__menu-list-item');
            const menuListLink = new Control<HTMLLinkElement>('a', 'header__menu-list-item-link');
            menuListLink.element.textContent = `${item[0]}`;
            menuListLink.element.href = `${item[1]}`;
            menuListLink.element.dataset.link = '';
            menuListLink.append(menuListItem.element);
            menuListItem.append(menuList.element);
        });

        userBlock.element.addEventListener('click', () => {
            userMenu.element.classList.toggle('header__user-block-menu_hide');
        });

        userMenuTitleSet.element.addEventListener('click', () => {
            window.location.href = '/auth?type=manage';
        });

        userMenuLogOut.element.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('hash');
            state.token = null;
            window.location.href = '/';
        });

        return wrapper.element;
    }
}

export default new HeaderView();
