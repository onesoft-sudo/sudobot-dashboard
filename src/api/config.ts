import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import { makeAPIURL } from '../utils/utils';

export interface ConfigUpdatePayload {
    
}

export async function configGet({ queryKey: [, id, token] }: QueryFunctionContext<string[], any>) {
    return axios.get(makeAPIURL(`/config/${encodeURIComponent(id)}`), {
        headers: {
            'Authorization': `Bearer ${encodeURIComponent(token)}`
        }
    });
}

export async function configUpdate({ token, id }: { token: string, id: string }, payload: ConfigUpdatePayload) {
    return axios.patch(makeAPIURL(`/config/${encodeURIComponent(id)}`), { config: payload }, {
        headers: {
            'Authorization': `Bearer ${encodeURIComponent(token)}`
        }
    });
}