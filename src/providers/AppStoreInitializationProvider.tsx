"use client";

import { useAppDispatch, useAppStore } from "@/redux/hooks/AppStoreHooks";
import { initialize } from "@/redux/slice/InitializationSlice";
import { userSliceInitializer } from "@/redux/slice/UserSlice";
import { PropsWithChildren, useEffect } from "react";

const initializers = [userSliceInitializer];

export default function AppStoreInitializerProvider({ children }: PropsWithChildren) {
    const store = useAppStore();
    const dispatch = useAppDispatch();

    useEffect(() => {
        initializers.forEach((initializer) => initializer(store));
        dispatch(initialize());
    }, []);

    return children;
}
