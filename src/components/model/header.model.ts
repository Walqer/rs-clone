import { state } from '../../store/state';

class HeaderModel {
    getUserInfo() {
        return {
            fullname: state.login,
            imgSrc: '../../assets/img/icon.svg',
        };
    }
}

export default new HeaderModel();
