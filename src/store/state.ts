import { Column } from '../spa/types';

interface IState {
    token: string | null;
    userId: string | null;
    boardId: string | null;
    login: string | null;
    authError: string | null;
    columnError: string | null;
    columns: Array<Column> | null;
    dragElement: HTMLElement | null;
}

export const state: IState = {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    boardId: localStorage.getItem('boardID') || null,
    login: localStorage.getItem('login') || null,
    authError: null,
    columnError: null,
    columns: null,
    dragElement: null,
};
