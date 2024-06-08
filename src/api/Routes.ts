export enum Route {
    AUTH_LOGIN = "/login",
    LATEST_ANNOUNCEMENT = "/announcements/latest",
    VERIFY_BY_GITHUB = "/challenge/github",
    VERIFY_BY_DISCORD = "/challenge/discord",
    VERIFICATION_GUILD = "/verification/guild",
}

export const resolveRoute = (route: Route) => {
    return process.env.NEXT_PUBLIC_API_URL + route;
};
