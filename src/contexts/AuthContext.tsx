import { createContext, Dispatch, PropsWithChildren, ReducerAction, SetStateAction, useContext, useEffect, useReducer } from "react";

export enum AuthContextAction {
    LOGIN = 'login',
    LOGOUT = 'logout',
    SET_GUILD = 'set_guild'
}

type Action = { type: AuthContextAction, payload?: any };

export const AuthContextReducer = (state: any, action: Action) => {
    switch (action.type) {
        case AuthContextAction.LOGIN:
            return { ...state, user: action.payload, guild: action.payload.guilds[0] ?? null };

        case AuthContextAction.LOGOUT:
            console.log("Logged out");
            return { ...state, user: null };

        case AuthContextAction.SET_GUILD:
            console.log("Switching guilds");
            return { ...state, guild: action.payload ?? null };

        default:
            return state;
    }
};

export type AuthContextType = {
    user: any | null;
    guild: any | null;
    dispatch: Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextType>({ user: null, dispatch: () => null, guild: null });

export default function AuthContextProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(AuthContextReducer, { user: null, guild: null });

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user) {
            const payload = JSON.parse(user);

            if ((new Date(payload.expires)).getTime() <= (new Date()).getTime()) {
                localStorage.removeItem('user');
                dispatch({ type: AuthContextAction.LOGOUT });
                return;
            }

            try { 
                dispatch({ type: AuthContextAction.LOGIN, payload });
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

export function useAuthContext() {
    return useContext(AuthContext);
}