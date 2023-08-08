"use client";

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
    dispatch?: Dispatch<AuthContextReducerAction>;
}

export enum AuthContextAction {
    Login,
    Logout,
    Reload,
}

interface AuthContextReducerAction {
    type: AuthContextAction;
    payload?: any;
}

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
            return { ...state, user: action.payload };
        case AuthContextAction.Logout:
            return { ...state, user: null };
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
