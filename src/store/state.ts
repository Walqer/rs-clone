interface IState {
    token: string | null;
    userId: string | null;
    login: string | null;
    authError: string | null;
}

export const state: IState = {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    login: localStorage.getItem('login') || null,
    authError: null,
};
