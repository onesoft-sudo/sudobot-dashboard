import { SliceInitializer } from "@/types/SliceInitializer";
import { User } from "@/types/User";
import { createSlice } from "@reduxjs/toolkit";

type UserSliceState =
    | {
          available: false;
      }
    | {
          available: true;
          user: User;
      };

const initialState: UserSliceState = {
    available: false,
};

type SetUserPayload = {
    user: User;
    storage: "local" | "session";
};

export const userSliceInitializer: SliceInitializer = (store) => {
    const local = localStorage.getItem("user");
    const session = sessionStorage.getItem("user");

    if (local) {
        store.dispatch(setUser(JSON.parse(local)));
    } else if (session) {
        store.dispatch(setUser(JSON.parse(session)));
    }
};

const setUserReducer = (state: UserSliceState, action: { payload: User }) => {
    state.available = true;
    (state as Extract<UserSliceState, { available: true }>).user = action.payload;
    console.info("LOGIN", action.payload);
};

const clearUserReducer = (state: Partial<UserSliceState>) => {
    state.available = false;

    if ("user" in state) {
        delete state.user;
    }

    console.info("LOGOUT");
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state: UserSliceState, action: { payload: SetUserPayload }) => {
            setUserReducer(state, { payload: action.payload.user });
            const storage = action.payload.storage === "local" ? localStorage : sessionStorage;
            storage.setItem("user", JSON.stringify(action.payload.user));
        },
        setUser: setUserReducer,
        clearUser: clearUserReducer,
        logout: (state) => {
            clearUserReducer(state);

            if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
            }

            if (sessionStorage.getItem("user")) {
                sessionStorage.removeItem("user");
            }
        },
    },
});

export const { logout, login, setUser, clearUser } = slice.actions;
export const UserSliceReducer = slice.reducer;
