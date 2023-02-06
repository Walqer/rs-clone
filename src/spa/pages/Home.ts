import footerView from '../../components/view/footer.view';
import homeHeaderView from '../../components/view/home-header.view';
import signupWidgetView from '../../components/view/signup-widget.view';
import { Control } from '../../utils/Control';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Home extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Home');
    }

    async getHtml() {
        return `
        <h1 class="main-title visually-hidden">Home</h1>`;
    }

    async mounted() {
        const { body } = document;
        // header
        body.append(homeHeaderView.render());
        // main
        const main = new Control<HTMLElement>('main', 'home-content');
        const greating = new Control<HTMLElement>('div', 'greating');
        const h2 = new Control<HTMLElement>('h2', 'h2-greating');
        const p = new Control<HTMLElement>('p', 'p-greating');
        const collage = new Control<HTMLImageElement>('img', 'home-collage');
        main.append(body);
        greating.append(main.element);
        collage.element.src = '../../assets/img/home-page-collage.png';
        collage.append(main.element);
        h2.element.innerHTML = 'Task manager brings all your tasks, teammates, and tools together<br><br>';
        h2.append(greating.element);
        p.element.innerHTML = 'Keep everything in the same place—even if your team isnt<br><br>';
        p.append(greating.element);
        // signup widget
        greating.element.append(signupWidgetView.render());
        // footer
        body.append(footerView.render());
    }
}
