import { state } from '../../store/state';

class HomeHeaderModel {
    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('hash');
        state.token = null;
    }
}

export default new HomeHeaderModel();
