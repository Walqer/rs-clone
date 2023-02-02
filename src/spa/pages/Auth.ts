import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Auth extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Authentication');
    }

    async getHtml() {
        return `
        <h1 class="main-title">Authentication</h1>`;
    }

    async mounted() {
        document.body.innerHTML = `
            Auth
        `;
    }
}
