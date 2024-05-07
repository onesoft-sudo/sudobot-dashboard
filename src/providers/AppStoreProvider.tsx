"use client";

import { AppStore, makeStore } from "@/redux/store/AppStore";
import { PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";

export default function AppStoreProvider({ children }: PropsWithChildren) {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
