import { parseJwt } from '../api/helper';
import { state } from '../store/state';

export function initToken() {
    state.token = localStorage.getItem('token');
    if (state.token) {
        const { exp } = parseJwt(state.token);
        const expTime = exp * 1000;
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const curTime = now.getTime() + offset * 60 * 1000;
        if (curTime > expTime) {
            // localStorage.removeItem('token');
            // state.token = null;
            console.log('token is invalid');
        }
    }
}
