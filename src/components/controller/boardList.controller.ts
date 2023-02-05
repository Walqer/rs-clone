import boardListModel from '../model/boardList.model';

class BoardListController {
    getUserBoards() {
        return boardListModel.getUserBoards();
    }
}

export default new BoardListController();
