import loginModel from "../model/login.model";

class LoginController {
    async loginUser(login: string, password: string, update: () => void) {
        await loginModel.loginUser(login, password);
        update();
    }
}
export default new LoginController();
