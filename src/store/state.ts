interface IState {
    token: string | null;
    authError: string | null;
}

export const state: IState = {
    token: null,
    authError: null,
};
