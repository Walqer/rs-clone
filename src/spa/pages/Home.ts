import { Auth } from '../../components/model/auth';
import { AbstractView } from '../AbstractView';
import { QueryStringParams } from '../types';

export class Home extends AbstractView {
    constructor(params: QueryStringParams) {
        super(params);
        this.setTitle('Home');
    }

    async getHtml() {
        return `
      <h1 class="main-title">Home</h1>`;
    }

    async mounted() {
        document.body.innerHTML = 'mounted home';
        const auth = new Auth();
        //const res = await auth.signUp('admin', 'adm', '123');
        const res = await auth.signIn('adm', '123');
        console.log(res);
    }
}
