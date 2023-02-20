import { Column, ColumnOrder } from '../spa/types';

interface IState {
    token: string | null;
    userId: string | null;
    boardId: string | null;
    login: string | null;
    authError: string | null;
    columnError: string | null;
    columns: Array<Column>;
    countColumns: number;
    columnOrder: Array<ColumnOrder>;
    dragElement: HTMLElement | null;
    dragZone: HTMLElement | null;
    dragStartId: string;
    dragEnterId: string;
}

export const state: IState = {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    boardId: localStorage.getItem('boardID') || null,
    login: localStorage.getItem('login') || null,
    authError: null,
    columnError: null,
    columns: [],
    countColumns: 0,
    columnOrder: [],
    dragElement: null,
    dragZone: null,
    dragStartId: '',
    dragEnterId: '',
};
