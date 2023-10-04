/*
 * This file is part of SudoBot Dashboard.
 *
 * Copyright (C) 2021-2023 OSN Developers.
 *
 * SudoBot Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SudoBot Dashboard is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
 */

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
    SetUser,
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
          type: AuthContextAction.SetUser;
          payload: {
              user: Partial<APIUser>;
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
                if (localStorage.getItem("user")) {
                    localStorage.removeItem("user");
                }

                if (sessionStorage.getItem("user")) {
                    sessionStorage.removeItem("user");
                }

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
        case AuthContextAction.SetUser:
            const user = { ...state.user, ...action.payload.user } as any;
            const userJSON = JSON.stringify(user);

            if (sessionStorage.getItem("user")) {
                sessionStorage.setItem("user", userJSON);
            }

            if (localStorage.getItem("user")) {
                localStorage.setItem("user", userJSON);
            }

            return {
                ...state,
                user,
            };
        case AuthContextAction.Reload:
            try {
                const user =
                    sessionStorage.getItem("user") ??
                    localStorage.getItem("user");

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

    const pathname = usePathname()!;
    const { id } = useParams()!;

    useEffect(() => {
        try {
            const jsonUser =
                sessionStorage.getItem("user") ?? localStorage.getItem("user");

            if (!jsonUser) {
                dispatch({
                    type: AuthContextAction.Logout,
                });

                return;
            }

            const user = JSON.parse(jsonUser) as APIUser;

            if ("tokenExpiresAt" in user) {
                const tokenExpiresAt = new Date(user.tokenExpiresAt);

                if (Date.now() > tokenExpiresAt.getTime()) {
                    console.log("Token expired");

                    dispatch({
                        type: AuthContextAction.Logout,
                    });

                    return;
                }
            }

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
