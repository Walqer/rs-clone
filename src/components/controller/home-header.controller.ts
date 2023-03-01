import homeHeaderModel from '../model/home-header.model';

class HomeHeaderContoller {
    logOut(update: () => void) {
        homeHeaderModel.logOut();
        update();
        window.location.href = '/';
    }
}

export default new HomeHeaderContoller();
