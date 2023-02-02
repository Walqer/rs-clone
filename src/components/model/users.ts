import { urls } from './apiConfig';
import { TrelloModel } from './trelloModel';
import { User } from '../../spa/types';

export class Users extends TrelloModel {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
        super();
    }

    async getAllUsers(): Promise<User[] | string> {
        const url = `${urls.users}`;
        const res = await this.fetchApi(url, 'GET');
        if (res.status === 200) return await res.body as unknown as User[];
        return 'error';
    }

    async getUserById(userId: string): Promise<User | string> {
        const url = `${urls.users}/${userId}`;
        const res = await this.fetchApi(url, 'GET');
        if (res.status === 200) return await res.body as unknown as User;
        if (res.status === 404) return 'User was not founded!';
        return 'error';
    }

    async updateUserById(userId: string, name: string, login: string, password: string): Promise<User | string> {
        const url = `${urls.users}/${userId}`;
        const user = { name, login, password };
        const res = await this.fetchApi(url, 'PUT', user);
        if (res.status === 200) return await res.body as unknown as User;
        if (res.status === 400) return 'Bad Request';
        if (res.status === 409) return 'Login already exist';
        return 'error';
    }

    async deleteUserById(userId: string): Promise<User | string> {
        const url = `${urls.users}/${userId}`;
        const res = await this.fetchApi(url, 'DELETE');
        if (res.status === 200) return await res.body as unknown as User;
        return 'error';
    }
}
