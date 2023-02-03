import { HtmlElem } from '../../utils/HtmlElement';

class Header {
    render(): HTMLElement {
        const header = new HtmlElem('header', 'header');
        const logo = new HtmlElem('a', 'header__logo');
        logo.element.textContent = 'Task manager';
        logo.append(header.element);

        const menuLinks = [
            ['Dashboard', 'href'],
            ['About Us', 'href'],
        ];
        // const menu = new HtmlElem('nav','header__menu');
        // const menuList = new HtmlElem('ul','header__menu-list');
        menuLinks.forEach((item) => {
            // const menuListItem =  new HtmlElem('li','header__menu-list-item');
            const menuListLink = new HtmlElem('a', 'header__menu-list-link');
            menuListLink.element.textContent = `${item[0]}`;
            // menuListLink.element.href = `${item[0]}`;
        });
        return header.element;
    }
}

export default new Header();
