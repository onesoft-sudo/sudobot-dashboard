export enum Route {
    AUTH_LOGIN = "/login",
    LATEST_ANNOUNCEMENT = "/announcements/latest",
}

export const resolveRoute = (route: Route) => {
    return process.env.NEXT_PUBLIC_API_URL + route;
};
