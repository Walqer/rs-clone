import { urls } from './apiConfig';
import { TrelloModel } from './trelloModel';
import { Token, User } from '../../spa/types';

export class Auth extends TrelloModel {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
        super();
    }

    async signIn(login: string, password: string): Promise<Token | string> {
        const url = `${urls.signin}`;
        const sign = { login, password };
        const res = await this.fetchApi(url, 'POST', sign);
        if (res.status === 200) return await res.body as unknown as Token;
        if (res.status === 400) return 'Bad Request';
        if (res.status === 401) return 'Authorization error';
        return 'error';
    }

    async signUp(name: string, login: string, password: string): Promise<User | string> {
        const url = `${urls.signup}`;
        const user = { name, login, password };
        const res = await this.fetchApi(url, 'POST', user);
        if (res.status === 200) return res.body as unknown as User;
        if (res.status === 400) return 'Bad Request';
        if (res.status === 409) return 'Login already exist';
        return 'error';
    }

}
