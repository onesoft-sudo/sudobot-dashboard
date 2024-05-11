export function isDashboardPath(pathname: string) {
    return pathname.startsWith("/dashboard") || pathname.startsWith("/account") || pathname.startsWith("/settings");
}
