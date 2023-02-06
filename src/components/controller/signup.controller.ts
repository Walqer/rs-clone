import signUpModel from '../model/signup.model';

class SignUpController {
    async registerUser(name: string, login: string, password: string) {
        await signUpModel.registerUser(name, login, password);
    }
}

export default new SignUpController();
