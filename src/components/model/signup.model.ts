import { signUp } from '../../api/auth';
import { state } from '../../store/state';
import loginModel from './login.model';

class SignUpModel {
    async registerUser(name: string, login: string, password: string) {
        const res = await signUp(name, login, password);
        if (typeof res === 'object') {
            await loginModel.loginUser(login, password);
        } else state.authError = res;
    }
}
export default new SignUpModel();
