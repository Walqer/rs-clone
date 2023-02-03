import { urls } from './apiConfig';
import { fetchApi } from './helper';
import { Token, User } from '../../../spa/types';

export async function signIn(login: string, password: string): Promise<Token | string> {
    const url = `${urls.signin}`;
    const sign = { login, password };
    const res = await fetchApi(url, 'POST', sign);
    if (res.status === 200) return (await res.body) as unknown as Token;
    if (res.status === 400) return 'Bad Request';
    if (res.status === 401) return 'Authorization error';
    return 'error';
}

export async function signUp(name: string, login: string, password: string): Promise<User | string> {
    const url = `${urls.signup}`;
    const user = { name, login, password };
    const res = await fetchApi(url, 'POST', user);
    if (res.status === 200) return res.body as unknown as User;
    if (res.status === 400) return 'Bad Request';
    if (res.status === 409) return 'Login already exist';
    return 'error';
}
