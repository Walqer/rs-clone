import { state } from '../../store/state';

class HomeHeaderModel {
    logOut() {
        localStorage.removeItem('token');
        state.token = null;
    }
}

export default new HomeHeaderModel();
