import { signIn } from '../../api/auth';
import { state } from '../../store/state';

class LoginModel {
    async loginUser(login: string, password: string) {
        const res = await signIn(login, password);
        if (typeof res === 'object') {
            localStorage.setItem('token', res.token);
            state.token = res.token;
            window.location.href = '/workspace';
        } else state.authError = res;
    }
}
export default new LoginModel();
