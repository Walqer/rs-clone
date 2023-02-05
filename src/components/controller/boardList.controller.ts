import boardListModel from '../model/boardList.model';

class BoardListController {
    getUserBoards() {
        return boardListModel.getUserBoards();
    }

    getBoardColorList() {
        return boardListModel.getBoardColorList();
    }

    createBoard(name: string, color: string) {
        return boardListModel.createBoard(name, color);
    }
}

export default new BoardListController();
