export function isDashboardPath(pathname: string) {
    return pathname.startsWith("/dashboard") || pathname.startsWith("/account") || pathname.startsWith("/settings");
}

export const unreachable = (): never => {
    throw new Error("Unreachable code");
};
