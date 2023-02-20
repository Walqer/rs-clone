import { getUserById, updateUserById } from '../../api/users';
import { state } from '../../store/state';

class ManageModel {
    async updateUserById(name: string, login: string, pass: string) {
        await updateUserById(state.token as string, state.userId as string, name, login, pass);
    }

    async getUserById() {
        const resp = await getUserById(state.token as string, state.userId as string);
        if (typeof resp !== 'string') return resp;
        return 'error';
    }
}
export default new ManageModel();
