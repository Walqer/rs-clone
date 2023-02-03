import { Control } from '../../utils/Control';

class HeaderView {
    render(): HTMLElement {
        const header = new Control<HTMLElement>('header', 'header');
        const logo = new Control<HTMLLinkElement>('a', 'header__logo');
        const menu = new Control<HTMLElement>('nav', 'header__menu');
        const menuList = new Control<HTMLUListElement>('ul', 'header__menu-list');
        const menuLinks = [
            ['Dashboard', 'href'],
            ['About Us', 'href'],
        ];
        const userBlock = new Control<HTMLDivElement>('div', 'header__user-block');
        const userIcon = new Control<HTMLImageElement>('img', 'header__user-block-img');
        const userInfo = new Control<HTMLSpanElement>('span', 'header__user-block-info');
        userIcon.element.src = '../../assets/img/icon.svg';
        userIcon.append(userBlock.element);
        userInfo.element.textContent = 'Clayton Santos';
        userInfo.append(userBlock.element);
        logo.element.textContent = 'Task manager';
        logo.append(header.element);
        menu.append(header.element);
        userBlock.append(header.element);
        menuList.append(menu.element);
        menuLinks.forEach((item) => {
            const menuListItem = new Control<HTMLLIElement>('li', 'header__menu-list-item');
            const menuListLink = new Control<HTMLLinkElement>('a', 'header__menu-list-item-link');
            menuListLink.element.textContent = `${item[0]}`;
            menuListLink.element.href = `${item[1]}`;
            menuListLink.append(menuListItem.element);
            menuListItem.append(menuList.element);
        });
        return header.element;
    }
}

export default new HeaderView();
