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
            avatar: "https://cdn.discordapp.com/avatars/774553653394538506/122a9dba34f636cb35e19a963e8e42f6.webp",
        },
        guilds: ["911987536379912193", "964969362073198652"],
    };
};
