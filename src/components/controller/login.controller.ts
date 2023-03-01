import loginModel from '../model/login.model';

class LoginController {
    async loginUser(login: string, password: string) {
        await loginModel.loginUser(login, password);
    }
}
export default new LoginController();
