export type QueryStringParams = { [key: string]: string };

export type User = {
    _id: string;
    name: string;
    login: string;
};

export type Board = {
    _id: string;
    title: string;
    owner: string;
    users: string[];
    bgColor: string;
    bgImg: string;
    usersFavourite: string[];
};

export type Column = {
    _id: string;
    title: string;
    order: number;
    boardId: string;
};

export type ColumnOrder = {
    _id: string;
    order: number;
};

export type ColumnList = {
    title: string;
    order: number;
    boardId: string;
};

export type Task = {
    _id: string;
    title: string;
    order: number;
    boardId: string;
    columnId: string;
    description: string;
    userId: string;
    users: string[];
};

export type TaskOrder = {
    _id: string;
    order: number;
    columnId: string;
};

export type Token = {
    token: string;
};

export type JWTData = {
    id: string;
    login: string;
    iat: number;
    exp: number;
};

export type File = {
    _id: string;
    name: string;
    taskId: string;
    boardId: string;
    path: string;
};

export enum DefaultColumns {
    Tasks = 'Tasks',
    InProgress = 'InProgress',
    Done = 'Done',
}
