import { state } from '../../store/state';

class HomeHeaderModel {
    logOut() {
        localStorage.removeItem('token');
        state.token = null;
        console.log(state.token);
    }
}

export default new HomeHeaderModel();
