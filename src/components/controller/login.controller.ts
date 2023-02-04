import { signIn } from "../../api/auth";

class LoginController {
   async loginUser( login: string, password: string) {
        const token = await signIn(login, password);
        if(typeof token === 'object') window.location.href = '/workspace';
            else alert(token);
    }
}
export default new LoginController();