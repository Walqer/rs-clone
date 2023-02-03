import { urls } from './apiConfig';
import { fetchApi } from './helper';
import { User } from '../../../spa/types';

export async function getAllUsers(): Promise<User[] | string> {
    const url = `${urls.users}`;
    const res = await fetchApi(url, 'GET');
    if (res.status === 200) return (await res.body) as unknown as User[];
    return 'error';
}

export async function getUserById(userId: string): Promise<User | string> {
    const url = `${urls.users}/${userId}`;
    const res = await fetchApi(url, 'GET');
    if (res.status === 200) return (await res.body) as unknown as User;
    if (res.status === 404) return 'User was not founded!';
    return 'error';
}

export async function updateUserById(userId: string, name: string, login: string, password: string): Promise<User | string> {
    const url = `${urls.users}/${userId}`;
    const user = { name, login, password };
    const res = await fetchApi(url, 'PUT', user);
    if (res.status === 200) return (await res.body) as unknown as User;
    if (res.status === 400) return 'Bad Request';
    if (res.status === 409) return 'Login already exist';
    return 'error';
}

export async function deleteUserById(userId: string): Promise<User | string> {
    const url = `${urls.users}/${userId}`;
    const res = await fetchApi(url, 'DELETE');
    if (res.status === 200) return (await res.body) as unknown as User;
    return 'error';
}
