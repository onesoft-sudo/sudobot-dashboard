"use client";

import { APIGuild } from "@/types/APIGuild";
import { APIUser } from "@/types/APIUser";
import { useParams, usePathname } from "next/navigation";
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
          payload: {
              user: APIUser;
              guild?: string;
          };
      }
    | {
          type: AuthContextAction.Logout;
      }
    | {
          type: AuthContextAction.Reload;
      }
    | {
          type: AuthContextAction.SwitchGuild;
          payload: string;
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
                user: action.payload.user,
                currentGuild:
                    (action.payload.guild
                        ? action.payload.user.guilds.find(
                              g => g.id === action.payload.guild
                          )
                        : null) ?? action.payload.user.guilds?.[0],
            };
        case AuthContextAction.Logout:
            try {
                localStorage.removeItem("user");

                if (sessionStorage.getItem("discord_oauth_state")) {
                    sessionStorage.removeItem("discord_oauth_state");
                }
            } catch (e) {}
            return { ...state, user: null, currentGuild: null };
        case AuthContextAction.SwitchGuild:
            const guild = state.user?.guilds.find(g => g.id === action.payload);

            if (!guild) {
                throw new Error(`No such guild with ID "${action.payload}"`);
            }

            return {
                ...state,
                currentGuild: guild,
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

    const pathname = usePathname();
    const { id } = useParams();

    useEffect(() => {
        try {
            const jsonUser = localStorage.getItem("user");

            if (!jsonUser) {
                dispatch({
                    type: AuthContextAction.Logout,
                });

                return;
            }

            const user = JSON.parse(jsonUser) as APIUser;

            dispatch({
                type: AuthContextAction.Login,
                payload: {
                    user,
                    guild:
                        (id && pathname.startsWith("/dashboard")) ||
                        pathname.startsWith("/settings")
                            ? typeof id === "string"
                                ? id
                                : id[0]
                            : undefined,
                },
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
