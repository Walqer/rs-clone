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

    addBoardToFavorite(boardId: string) {
        return boardListModel.addBoardToFavorite(boardId);
    }

    removeBoardFromFavorite(boardId: string) {
        return boardListModel.removeBoardFromFavorite(boardId);
    }
}

export default new BoardListController();
