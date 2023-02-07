import { signIn } from '../../api/auth';
import { parseJwt } from '../../api/helper';
import { state } from '../../store/state';

class LoginModel {
    async loginUser(login: string, password: string) {
        const res = await signIn(login, password);
        if (typeof res === 'object') {
            localStorage.setItem('token', res.token);
            state.token = res.token;

            const jwt = parseJwt(res.token);
            localStorage.setItem('userId', jwt.id);
            localStorage.setItem('login', jwt.login);
            state.userId = jwt.id;
            state.login = jwt.login;

            window.location.href = '/workspace';
        } else state.authError = res;
    }
}
export default new LoginModel();
