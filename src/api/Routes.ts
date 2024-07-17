export enum Route {
    AUTH_LOGIN = "/login",
    AUTH_LOGIN_WITH_DISCORD = "/challenge/auth/discord",
    LATEST_ANNOUNCEMENT = "/announcements/latest",
    VERIFY_BY_GITHUB = "/challenge/github",
    VERIFY_BY_DISCORD = "/challenge/discord",
    VERIFY_BY_GOOGLE = "/challenge/google",
    VERIFICATION_GUILD = "/verification/guild",
    VERIFICATION_INITIATE_EMAIL = "/start-challenge/email",
    VERIFICATION_FINISH_EMAIL = "/challenge/email",
    VERIFICATION_START_CAPTCHA = "/challenge/start",
    VERIFY_CAPTCHA = "/challenge/captcha",
}

export const resolveRoute = (route: Route) => {
    return process.env.NEXT_PUBLIC_API_URL + route;
};
