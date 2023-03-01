import * as bcrypt from 'bcryptjs';
import { Board } from '../spa/types';
import { getBoardById, updateBoardFavourites, updateBoardUsers } from './boards';

export async function addToFavourites(token: string, boardId: string, userId: string): Promise<Board | string> {
    const board = await getBoardById(token, boardId);
    if (typeof board === 'string') return board;

    const favourites = board.usersFavourite;
    if (favourites.includes(userId)) return board;
    favourites.push(userId);
    const update = await updateBoardFavourites(token, boardId, favourites);
    return update;
}

export async function removeFromFavourites(token: string, boardId: string, userId: string): Promise<Board | string> {
    const board = await getBoardById(token, boardId);
    if (typeof board === 'string') return board;

    const favourites = board.usersFavourite;
    const index = favourites.indexOf(userId);
    if (index === -1) return board;
    favourites.splice(index, 1);
    const update = await updateBoardFavourites(token, boardId, favourites);
    return update;
}

export async function addUserToBoard(token: string, boardId: string, userId: string): Promise<Board | string> {
    const board = await getBoardById(token, boardId);
    if (typeof board === 'string') return board;

    const { users } = board;
    if (users.includes(userId)) return board;
    users.push(userId);
    const update = await updateBoardUsers(token, boardId, users);
    return update;
}

export async function removeUserFromBoard(token: string, boardId: string, userId: string): Promise<Board | string> {
    const board = await getBoardById(token, boardId);
    if (typeof board === 'string') return board;

    const { users } = board;
    const index = users.indexOf(userId);
    if (index === -1) return board;
    users.splice(index, 1);
    const update = await updateBoardUsers(token, boardId, users);
    return update;
}

export async function isBoardOwner(token: string, boardId: string, userId: string): Promise<boolean> {
    const board = await getBoardById(token, boardId);
    if (typeof board === 'string') return false;

    const { owner } = board;
    if (owner === userId) return true;
    return false;
}

export function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

export function compareHashPassword(s: string, password: string) {
    return bcrypt.compareSync(s, password);
}
