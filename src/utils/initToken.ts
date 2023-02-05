import { state } from "../store/state";

export function initToken() {
    state.token =  localStorage.getItem('token');
}