interface IState {
    token: string | null;
    authError: string | null;
}

export const state: IState = {
    token: localStorage.getItem('token') || null,
    authError: null,
};
