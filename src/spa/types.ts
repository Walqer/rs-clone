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

export type Token = {
    token: string;
};
