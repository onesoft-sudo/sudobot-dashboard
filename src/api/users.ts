import { wait } from "@/utils/utils";
import { AxiosError, AxiosResponse } from "axios";

export async function login({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    // FIXME

    await wait(2000);

    if (username !== "root" || password !== "test") {
        throw new AxiosError(
            "Received non-2xx status code",
            "403",
            undefined,
            undefined,
            {
                data: {
                    error: "Incorrect login credentials",
                },
                status: 200,
            } as AxiosResponse
        );
    }

    await wait(2000);

    return {
        data: {
            id: 1,
            username: "root",
            token: "2661476458283654651",
        },
        status: 200,
    } as Partial<AxiosResponse>;
    // return axios.post(API.login(), { username, password });
}
