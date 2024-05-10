import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { logout } from "@/redux/slice/UserSlice";
import { usePathname, useRouter } from "next/navigation";

export const useCurrentUser = () => {
    const state = useAppSelector((state) => state.user);

    if (state.available) {
        return state.user;
    }

    return undefined;
};

export const useCurrentUserInfo = () => {
    const state = useAppSelector((state) => state.user);

    if (state.available) {
        return {
            user: state.user,
            guildIds: state.guildIds,
            currentGuildId: state.currentGuildId,
        };
    }

    return {
        user: undefined,
        guildIds: undefined,
        currentGuildId: undefined,
    };
};

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    return () => {
        dispatch(logout());

        if (pathname !== "/login") {
            router.push("/login");
        }
    };
};

export const useIsLoggedIn = () => {
    return useAppSelector((state) => state.user.available);
};
