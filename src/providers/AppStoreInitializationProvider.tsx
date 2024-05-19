"use client";

import { useAppDispatch, useAppStore } from "@/redux/hooks/AppStoreHooks";
import { guildCacheSliceInitializer } from "@/redux/slice/GuildCacheSlice";
import { initialize } from "@/redux/slice/InitializationSlice";
import { userSliceInitializer } from "@/redux/slice/UserSlice";
import { PropsWithChildren, useEffect } from "react";

const initializers = [guildCacheSliceInitializer, userSliceInitializer];

export default function AppStoreInitializerProvider({ children }: PropsWithChildren) {
    const store = useAppStore();
    const dispatch = useAppDispatch();

    useEffect(() => {
        initializers.forEach((initializer) => initializer(store));
        dispatch(initialize());
    }, [dispatch, store]);

    return children;
}
