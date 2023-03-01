import { deleteUserById, getUserById, updateUserById } from '../../api/users';
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

    async deleteUserById() {
        await deleteUserById(state.token as string, state.userId as string);
        localStorage.removeItem('token');
        localStorage.removeItem('hash');
        state.token = null;
        window.location.href = '/';
    }
}
export default new ManageModel();
