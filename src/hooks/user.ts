import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { logout } from "@/redux/slice/UserSlice";

export const useCurrentUser = () => {
    const state = useAppSelector((state) => state.user);

    if (state.available) {
        return state.user;
    }

    return undefined;
};

export const useLogout = () => {
    const dispatch = useAppDispatch();

    return () => {
        dispatch(logout());
    };
};

export const useIsLoggedIn = () => {
    return useAppSelector((state) => state.user.available);
};
