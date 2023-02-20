import manageModel from '../model/manage.model';

class ManageController {
    async updateUserById(name: string, login: string, pass: string) {
        await manageModel.updateUserById(name, login, pass);
    }

    getUserById() {
        return manageModel.getUserById();
    }
}
export default new ManageController();
