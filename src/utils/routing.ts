import { headers } from "next/headers";

export const getAppRouterURL = () => {
    const rawUrl = headers().get("x-url") 

    if (!rawUrl) {
        throw new Error("No x-url header found in request")
    }

    return new URL(rawUrl);
}