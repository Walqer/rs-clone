import { Control } from '../../utils/Control';

class FooterView {
    render(): HTMLElement {
        const footer = new Control<HTMLElement>('footer', 'footer');
        const rssLink = new Control<HTMLLinkElement>('a', 'link-to-rss');
        const rssLogo = new Control<HTMLImageElement>('img', 'logo-rss');
        const year = new Control<HTMLElement>('div', 'year');
        const gitLink = new Control<HTMLLinkElement>('ul', 'categories');
        rssLink.element.href = 'https://rs.school/js/';
        rssLink.append(footer.element);
        rssLogo.element.src = '../../assets/icons/rsslogo.png';
        rssLogo.append(rssLink.element);
        year.element.innerHTML = '2023';
        gitLink.element.innerHTML = `
            <li class="category">
                <a href="#" class="btn"><img src="../../assets/icons/github-logo.png"></a>
                <ul class="submenu">
                    <li><a href="https://github.com/231globus">231globus</a></li>
                    <li><a href="https://github.com/errfrost">errfrost</a></li>
                    <li><a href="https://github.com/Walqer">Walqer</a></li>
                </ul>
            </li>
        `;
        gitLink.append(footer.element);
        return footer.element;
    }
}

export default new FooterView();
