"use client";

import { useAppStore } from "@/redux/hooks/AppStoreHooks";
import { userSliceInitializer } from "@/redux/slice/UserSlice";
import { PropsWithChildren, useEffect } from "react";

const initializers = [userSliceInitializer];

export default function AppStoreInitializerProvider({ children }: PropsWithChildren) {
    const store = useAppStore();
    useEffect(() => initializers.forEach((initializer) => initializer(store)), []);
    return children;
}
