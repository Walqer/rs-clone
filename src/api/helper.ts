import homeHeaderModel from '../components/model/home-header.model';
import { JWTData } from '../spa/types';
import preloader from '../utils/Preloader';

export async function fetchApi(url: string, method: string, token: string, body?: object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token !== '') headers.append('Authorization', `Bearer ${token}`);
    preloader.start();
    const response = await fetch(url, {
        headers,
        method,
        body: body ? JSON.stringify(body) : null,
    }).then((res) => ({ status: res.status, body: res.json() }));
    preloader.stop();
    if (response.status === 403) {
        homeHeaderModel.logOut();
        document.location = '/auth?type=login';
    }
    return response;
}

export async function fetchApiFormData(url: string, method: string, token: string, formElement: HTMLFormElement) {
    const headers = new Headers();
    if (token !== '') headers.append('Authorization', `Bearer ${token}`);
    const data = new FormData(formElement);

    const response = await fetch(url, {
        headers,
        method,
        body: data,
    }).then((res) => ({ status: res.status, body: res.json() }));
    if (response.status === 403) {
        homeHeaderModel.logOut();
        document.location = '/auth?type=login';
    }
    return response;
}

export function parseJwt(token: string): JWTData {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => {
                const s = c.charCodeAt(0).toString(16);
                return `%${`00${s}`.slice(-2)}`;
            })
            .join('')
    );
    return JSON.parse(jsonPayload) as JWTData;
}
