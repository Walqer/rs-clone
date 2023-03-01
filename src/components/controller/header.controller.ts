import headerModel from '../model/header.model';

class HeaderContoller {
    getUserInfo() {
        return headerModel.getUserInfo();
    }
}

export default new HeaderContoller();
