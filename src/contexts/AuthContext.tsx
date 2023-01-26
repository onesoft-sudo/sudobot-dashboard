import { createContext, Dispatch, PropsWithChildren, ReducerAction, SetStateAction, useEffect, useReducer } from "react";

export enum AuthContextAction {
    LOGIN = 'login',
    LOGOUT = 'logout'
}

type Action = { type: AuthContextAction, payload: any };

export const AuthContextReducer = (state: any, action: Action) => {
    switch (action.type) {
        case AuthContextAction.LOGIN:
            return { ...state, user: action.payload };

        case AuthContextAction.LOGOUT:
            return { ...state, user: null };

        default:
            return state;
    }
};

export type AuthContextType = {
    user: any | null;
    dispatch: Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextType>({ user: null, dispatch: () => null });

export default function AuthContextProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(AuthContextReducer, { user: null });

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user) {
            try {
                dispatch({ type: AuthContextAction.LOGIN, payload: JSON.parse(user) });
            }
            catch (e) {
                console.log(e);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}