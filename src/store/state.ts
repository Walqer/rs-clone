import { Column, ColumnOrder, User } from '../spa/types';

interface IState {
    token: string | null;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
    taskId: string | null;
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
    boardOwner: User | null;
    boardUsers: Array<User>;
    notBoardUsers: Array<User>;
}

export const state: IState = {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    boardId: localStorage.getItem('boardID') || null,
    columnId: localStorage.getItem('columnID') || null,
    taskId: localStorage.getItem('taskID') || null,
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
    boardOwner: null,
    boardUsers: [],
    notBoardUsers: [],
};
