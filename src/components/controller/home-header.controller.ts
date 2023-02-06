import homeHeaderModel from '../model/home-header.model';

class HomeHeaderContoller {
    logOut(update: () => void) {
        homeHeaderModel.logOut();
        update();
    }
}

export default new HomeHeaderContoller();
