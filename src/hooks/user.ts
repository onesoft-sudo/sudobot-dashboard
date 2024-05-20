import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { clearCachedGuilds } from "@/redux/slice/GuildCacheSlice";
import { logout } from "@/redux/slice/UserSlice";
import { User } from "@/types/User";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCurrentUser = (force = true) => {
    const { user } = useCurrentUserInfo(force);
    return user;
};

export type UseCurrentUserInfoReturnType<F extends boolean> = {
    user: F extends true ? User : User | undefined;
    guildIds: F extends true ? string[] : string[] | undefined;
    currentGuildId: F extends true ? string : string | undefined;
};

export const useCurrentUserInfo = (force: boolean = true) => {
    const state = useAppSelector((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (force && !state.available && !state.resolving && pathname !== "/login") {
            router.push(`/login?ct=${encodeURIComponent(pathname)}`);
        }
    }, [state.available, state.resolving, force, router, pathname]);

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
        dispatch(clearCachedGuilds());

        if (pathname !== "/login") {
            router.push("/login");
        }
    };
};

export const useIsLoggedIn = () => {
    return useAppSelector((state) => state.user.available);
};
