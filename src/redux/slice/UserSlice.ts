import { setToken } from "@/client/axios";
import { SliceInitializer } from "@/types/SliceInitializer";
import { StorageKeys } from "@/types/StorageKeys";
import { User } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";
import { clearCachedGuilds } from "./GuildCacheSlice";

type UserSliceState = {
    available: boolean;
    user?: User;
    token?: string;
    expires?: number;
    guildIds?: string[];
    currentGuildId?: string;
};

type LoginPayload = {
    user: User;
    token: string;
    expires: number;
    storage: "local" | "session";
    guildIds: string[];
    currentGuildId?: string;
};

type SetUserReducerPayload = {
    user: User;
    token: string;
    expires: number;
    guildIds: string[];
    currentGuildId?: string;
};

const initialState: UserSliceState = {
    available: false,
};

export const userSliceInitializer: SliceInitializer = (store) => {
    const local = localStorage.getItem(StorageKeys.User);
    const session = sessionStorage.getItem(StorageKeys.User);
    const info = local ? JSON.parse(local) : session ? JSON.parse(session) : undefined;

    if (info && "expires" in info && info.expires > Date.now()) {
        store.dispatch(
            setUser({
                user: info.user,
                token: info.token,
                expires: info.expires,
                guildIds: info.guildIds,
                currentGuildId: info.currentGuildId,
            }),
        );
    } else {
        console.log(info);
        store.dispatch(logout());
        store.dispatch(clearCachedGuilds());
    }
};

const setUserReducer = (state: UserSliceState, action: { payload: SetUserReducerPayload }) => {
    state.available = true;
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.expires = action.payload.expires;
    state.guildIds = action.payload.guildIds;
    state.currentGuildId = action.payload.currentGuildId;

    setToken(state.token);
    console.info("LOGIN", action.payload);
};

const clearUserReducer = (state: Partial<UserSliceState>) => {
    state.available = false;
    state.user = undefined;
    state.token = undefined;
    state.expires = undefined;
    state.guildIds = undefined;
    state.currentGuildId = undefined;

    setToken(undefined);
    console.info("LOGOUT");
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state: UserSliceState, action: { payload: LoginPayload }) => {
            setUserReducer(state, {
                payload: {
                    user: action.payload.user,
                    expires: action.payload.expires,
                    token: action.payload.token,
                    guildIds: action.payload.guildIds,
                    currentGuildId: action.payload.currentGuildId,
                },
            });

            const storage = action.payload.storage === "local" ? localStorage : sessionStorage;

            storage.setItem(
                StorageKeys.User,
                JSON.stringify({
                    user: action.payload.user,
                    token: action.payload.token,
                    guildIds: action.payload.guildIds,
                    currentGuildId: action.payload.currentGuildId,
                    expires: action.payload.expires,
                }),
            );
        },
        setUser: setUserReducer,
        clearUser: clearUserReducer,
        logout: (state) => {
            clearUserReducer(state);

            if (localStorage.getItem(StorageKeys.User)) {
                localStorage.removeItem(StorageKeys.User);
            }

            if (sessionStorage.getItem(StorageKeys.User)) {
                sessionStorage.removeItem(StorageKeys.User);
            }
        },
        setCurrentGuildId: (state, action: { payload: string }) => {
            state.currentGuildId = action.payload;
        },
    },
});

export const { logout, login, setUser, clearUser, setCurrentGuildId } = slice.actions;
export const UserSliceReducer = slice.reducer;
