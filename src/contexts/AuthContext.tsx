"use client";

import { APIGuild } from "@/types/APIGuild";
import { APIUser } from "@/types/APIUser";
import {
    Dispatch,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";

interface AuthContextData {
    user: APIUser | null | undefined;
    currentGuild?: APIGuild | null;
    dispatch?: Dispatch<AuthContextReducerAction>;
}

export enum AuthContextAction {
    Login,
    Logout,
    Reload,
    SwitchGuild,
    SetGuild,
}

type AuthContextReducerAction =
    | {
          type: AuthContextAction.Login;
          payload: APIUser;
      }
    | {
          type: AuthContextAction.Logout;
      }
    | {
          type: AuthContextAction.Reload;
      }
    | {
          type: AuthContextAction.SwitchGuild;
          payload: number;
      }
    | {
          type: AuthContextAction.SetGuild;
          payload: APIGuild | null;
      };

export const AuthContext = createContext<AuthContextData>({
    user: undefined,
});

export function useAuthContext() {
    return useContext(AuthContext);
}

export const AuthContextReducer = (
    state: AuthContextData,
    action: AuthContextReducerAction
): AuthContextData => {
    switch (action.type) {
        case AuthContextAction.Login:
            return {
                ...state,
                user: action.payload,
                currentGuild: action.payload.guilds?.[0],
            };
        case AuthContextAction.Logout:
            return { ...state, user: null, currentGuild: null };
        case AuthContextAction.SwitchGuild:
            return {
                ...state,
                currentGuild: state.user?.guilds[action.payload],
            };
        case AuthContextAction.SetGuild:
            return {
                ...state,
                currentGuild: action.payload,
            };
        case AuthContextAction.Reload:
            try {
                const user = localStorage.getItem("user");

                if (!user) {
                    return state;
                }

                return { ...state, user: JSON.parse(user) };
            } catch (e) {
                return state;
            }
        default:
            return state;
    }
};

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(AuthContextReducer, {
        user: undefined,
        currentGuild: undefined,
    });

    useEffect(() => {
        try {
            const user = localStorage.getItem("user");

            if (!user) {
                dispatch({
                    type: AuthContextAction.Logout,
                });

                return;
            }

            dispatch({
                type: AuthContextAction.Login,
                payload: JSON.parse(user),
            });
        } catch (e) {
            return;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
