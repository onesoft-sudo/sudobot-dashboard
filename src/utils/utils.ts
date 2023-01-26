export function makeAPIURL(uri: string) {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL was not found on the environment.");
    }

    return `${process.env.NEXT_PUBLIC_API_URL}${uri}`;
}