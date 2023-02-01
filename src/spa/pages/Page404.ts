import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Page404 extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('404 Not Found');
    }

    async getHtml() {
        return `
      <h1 class="main-title">404 - Page not found</h1>>
    `;
    }

    async mounted() {
        document.body.innerHTML = 'mounted';
    }
}
