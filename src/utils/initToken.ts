import { parseJwt } from '../api/helper';
import { state } from '../store/state';

export function initToken() {
    state.token = localStorage.getItem('token');
    if (state.token) {
        const { exp } = parseJwt(state.token);
        const expTime = exp * 1000;
        const curTime = new Date().getTime();
        if (expTime - curTime >= -3000) {
            localStorage.removeItem('token');
            state.token = null;
            console.log('token is invalid');
        }
    }
}
