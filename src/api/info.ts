import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { makeAPIURL } from '../utils/utils';

export async function getRoles({ queryKey: [, id, token] }: QueryFunctionContext<string[], any>) {
    return axios.get(makeAPIURL(`/info/${encodeURIComponent(id)}/roles`), {
        headers: {
            'Authorization': `Bearer ${encodeURIComponent(token)}`
        }
    });
}

export async function getChannels({ queryKey: [, id, token] }: QueryFunctionContext<string[], any>) {
    return axios.get(makeAPIURL(`/info/${encodeURIComponent(id)}/channels`), {
        headers: {
            'Authorization': `Bearer ${encodeURIComponent(token)}`
        }
    });
}