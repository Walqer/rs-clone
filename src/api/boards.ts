import { urls } from './apiConfig';
import { fetchApi } from './helper';
import { Board } from '../spa/types';

export async function getAllBoards(token: string): Promise<Board[] | string> {
    const url = `${urls.boards}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Board[];
    return 'error';
}

export async function createBoard(
    token: string,
    title: string,
    owner: string,
    users: string[],
    bgColor: string,
    bgImg: string
): Promise<Board | string> {
    const url = `${urls.boards}`;
    const board = { title, owner, users, bgColor, bgImg };
    const res = await fetchApi(url, 'POST', token, board);
    if (res.status === 200) return (await res.body) as unknown as Board;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function getBoardById(token: string, boardId: string): Promise<Board | string> {
    const url = `${urls.boards}/${boardId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Board;
    if (res.status === 404) return 'Board was not founded!';
    return 'error';
}

export async function updateBoardById(
    token: string,
    boardId: string,
    title: string,
    owner: string,
    users: string[],
    bgcolor: string,
    bgimage: string
): Promise<Board | string> {
    const url = `${urls.boards}/${boardId}`;
    const board = { title, owner, users, bgcolor, bgimage };
    const res = await fetchApi(url, 'PUT', token, board);
    if (res.status === 200) return (await res.body) as unknown as Board;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function deleteBoardById(token: string, boardId: string): Promise<Board | string> {
    const url = `${urls.boards}/${boardId}`;
    const res = await fetchApi(url, 'DELETE', token);
    if (res.status === 200) return (await res.body) as unknown as Board;
    return 'error';
}

export async function getBoardsSet(token: string, boardIds: string[]): Promise<Board[] | string> {
    const url = `${urls.boardsSet}?ids=${boardIds.toString()}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Board[];
    return 'error';
}

export async function getBoardsSetByUserId(token: string, userId: string): Promise<Board[] | string> {
    const url = `${urls.boardsSet}/${userId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Board[];
    return 'error';
}
