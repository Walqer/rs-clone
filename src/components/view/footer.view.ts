import { Control } from "../../utils/Control";

class FooterView {
    render(): HTMLElement {
        const footer = new Control<HTMLElement>('footer', 'footer');
        const rssLink = new Control<HTMLLinkElement>('a', 'link-to-rss');
        const rssLogo = new Control<HTMLImageElement>('img', 'logo-rss');
        const year = new Control<HTMLElement>('div', 'year');
        const gitLink = new Control<HTMLLinkElement>('a', 'link-to-git');
        const gitLogo = new Control<HTMLImageElement>('img', 'logo-git');
        rssLink.element.href = 'https://rs.school/js/';
        rssLink.append(footer.element);
        rssLogo.element.src = '../../assets/icons/rsslogo.png';
        rssLogo.append(rssLink.element);
        year.element.innerHTML = '2023';
        gitLink.element.href = 'https://github.com/Walqer/';
        gitLink.append(footer.element);
        gitLogo.element.src = '../../assets/icons/github-logo.png';
        gitLogo.append(gitLink.element);

        return footer.element;
    }
}

export default new FooterView();