import { addToFavourites, isBoardOwner, removeFromFavourites, removeUserFromBoard } from '../../api/apiUtils';
import { createBoard, getBoardsSetByUserId, deleteBoardById } from '../../api/boards';
import { createColumn } from '../../api/columns';
import { DefaultColumns } from '../../spa/types';
import { state } from '../../store/state';

class BoardListModel {
    token: string;

    userId: string;

    constructor() {
        if (typeof state === 'object') {
            this.token = state.token as string;
            this.userId = state.userId as string;
        } else {
            this.token = 'invalid token';
            this.userId = 'invalid token';
        }
    }

    async getUserBoards() {
        const boards = await getBoardsSetByUserId(this.token, this.userId);
        if (typeof boards !== 'string') {
            return boards;
        }
        return 'error';
    }

    getBoardColorList() {
        return ['0079BF', 'D29034', '519839', 'B04632', '89609E', 'CD5AAF'];
    }

    async createBoard(name: string, color: string) {
        const newBoard = await createBoard(this.token, name, this.userId, [], color, '');
        if (typeof newBoard !== 'string') {
            await createColumn(this.token, newBoard._id, DefaultColumns.Tasks, 1)
                .then(async () => {
                    await createColumn(this.token, newBoard._id, DefaultColumns.InProgress, 2);
                })
                .then(async () => {
                    await createColumn(this.token, newBoard._id, DefaultColumns.Done, 3);
                });
        }
    }

    async deleteBoard(boardId: string) {
        const isOwner = await isBoardOwner(this.token, boardId, this.userId);
        if (isOwner) {
            await deleteBoardById(this.token, boardId);
        } else {
            await removeUserFromBoard(this.token, boardId, this.userId);
        }
    }

    addBoardToFavorite(boardId: string) {
        return addToFavourites(state.token as string, boardId, state.userId as string);
    }

    removeBoardFromFavorite(boardId: string) {
        return removeFromFavourites(state.token as string, boardId, state.userId as string);
    }
}

export default new BoardListModel();
