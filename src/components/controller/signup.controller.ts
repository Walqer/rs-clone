import { signUp } from "../../api/auth";

class SignupController {
   async registerUser(name: string, login: string, password: string) {
       const user = await signUp(name, login, password)
       if(typeof user === 'object') window.location.href = '/workspace';
       else alert(user);
    }
}

export default new SignupController();