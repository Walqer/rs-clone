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
    const usersFavourite: string[] = [];
    const board = { title, owner, users, bgColor, bgImg, usersFavourite };
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
    bgColor: string,
    bgImg: string,
    usersFavourite: string[]
): Promise<Board | string> {
    const url = `${urls.boards}/${boardId}`;
    const board = { title, owner, users, bgColor, bgImg, usersFavourite };
    const res = await fetchApi(url, 'PUT', token, board);
    if (res.status === 200) return (await res.body) as unknown as Board;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function updateBoardColor(token: string, boardId: string, bgColor: string): Promise<Board | string> {
    const url = `${urls.boards}/${boardId}/bgcolor`;
    const board = { bgColor };
    const res = await fetchApi(url, 'PATCH', token, board);
    if (res.status === 200) return (await res.body) as unknown as Board;
    if (res.status === 400) return 'Bad Request';
    return 'error';
}

export async function updateBoardImage(token: string, boardId: string, bgImg: string): Promise<Board | string> {
  const url = `${urls.boards}/${boardId}/image`;
  const board = { bgImg };
  const res = await fetchApi(url, 'PATCH', token, board);
  if (res.status === 200) return (await res.body) as unknown as Board;
  if (res.status === 400) return 'Bad Request';
  return 'error';
}

export async function updateBoardFavourites(token: string, boardId: string, usersFavourite: string[]): Promise<Board | string> {
  const url = `${urls.boards}/${boardId}/favourites`;
  const board = { usersFavourite };
  const res = await fetchApi(url, 'PATCH', token, board);
  if (res.status === 200) return (await res.body) as unknown as Board;
  if (res.status === 400) return 'Bad Request';
  return 'error';
}

export async function updateBoardUsers(token: string, boardId: string, users: string[]): Promise<Board | string> {
  const url = `${urls.boards}/${boardId}/users`;
  const board = { users };
  const res = await fetchApi(url, 'PATCH', token, board);
  if (res.status === 200) return (await res.body) as unknown as Board;
  if (res.status === 400) return 'Bad Request';
  return 'error';
}

export async function updateBoardTitle(token: string, boardId: string, title: string): Promise<Board | string> {
  const url = `${urls.boards}/${boardId}/title`;
  const board = { title };
  const res = await fetchApi(url, 'PATCH', token, board);
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

export async function getFavouriteBoardsByUserId(token: string, userId: string): Promise<Board[] | string> {
    const url = `${urls.favouriteBoards}/${userId}`;
    const res = await fetchApi(url, 'GET', token);
    if (res.status === 200) return (await res.body) as unknown as Board[];
    return 'error';
}
