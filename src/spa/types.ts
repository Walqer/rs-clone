export type QueryStringParams = { [key: string]: string };

export type User = {
    _id: string;
    name: string;
    login: string;
};

export type Token = {
    token: string;
};
