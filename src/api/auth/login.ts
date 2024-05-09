export type LoginRequest = {
    username: string;
    password: string;
};

export const requestLogin = async (data: LoginRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        token: "fake-token",
        expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
        user: {
            id: 0,
            username: data.username,
            name: "Ar Rakin",
        },
    };
};
