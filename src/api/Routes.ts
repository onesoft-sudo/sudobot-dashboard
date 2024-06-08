export enum Route {
    AUTH_LOGIN = "/login",
    LATEST_ANNOUNCEMENT = "/announcements/latest",
    VERIFY_BY_GITHUB = "/challenge/github",
    VERIFY_BY_DISCORD = "/challenge/discord",
    VERIFY_BY_GOOGLE = "/challenge/google",
    VERIFICATION_GUILD = "/verification/guild",
    VERIFICATION_INITIATE_EMAIL = "/start-challenge/email",
}

export const resolveRoute = (route: Route) => {
    return process.env.NEXT_PUBLIC_API_URL + route;
};
