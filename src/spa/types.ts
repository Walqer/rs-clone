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

export type Token = {
    token: string;
};
