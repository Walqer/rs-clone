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
                <a href="#" class="btn"><img src="../../assets/icons/github.png"></a>
                <ul class="submenu">
                    <li>
                        <a href="https://github.com/231globus">
                            <img src="https://avatars.githubusercontent.com/u/18600508?s=64&amp;v=4" alt="@231globus" class="avatar circle">
                            <div class="submenu-text">Viacheslav Bartosh</div>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Walqer">
                            <img src="https://avatars.githubusercontent.com/u/32606809?s=64&amp;v=4" alt="@Walqer" class="avatar circle">
                            <div class="submenu-text">Alimossim Agayev</div>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/errfrost">
                            <img src="https://avatars.githubusercontent.com/u/93862673?s=64&amp;v=4" alt="@errfrost" class="avatar circle">
                            <div class="submenu-text">Vladimir Kurganov</div>
                        </a>
                    </li>
                </ul>
            </li>
        `;
        gitLink.append(footer.element);
        return footer.element;
    }
}

export default new FooterView();
