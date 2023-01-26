import axios from 'axios';
import { makeAPIURL } from '../utils/utils';

export interface LoginPayload {
    username: string;
    password: string;
}

export async function login({ username, password }: LoginPayload) {
    return axios.post(makeAPIURL('/login'), {
        username,
        password
    });
}