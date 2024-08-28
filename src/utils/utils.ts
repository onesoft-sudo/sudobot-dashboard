export function isDashboardPath(pathname: string) {
    return (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/account") ||
        pathname.startsWith("/settings")
    );
}

export const unreachable = (): never => {
    throw new Error("Unreachable code");
};

export const loop = <T>(times: number, callback: (index: number) => T): T[] => {
    const result: T[] = [];

    for (let i = 0; i < times; i++) {
        result.push(callback(i));
    }

    return result;
};

export const isDevMode = () =>
    process.env.NEXT_PUBLIC_NODE_ENV === "development";

export const escapeMarkdown = (text: string) => {
    return text.replace(/([\\`*_~])/g, "\\$1");
};
