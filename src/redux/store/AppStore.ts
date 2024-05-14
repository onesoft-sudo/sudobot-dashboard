import { configureStore } from "@reduxjs/toolkit";
import { AnalyticsSliceReducer } from "../slice/AnalyticsSlice";
import { GuildCacheReducer } from "../slice/GuildCacheSlice";
import { InitializationSliceReducer } from "../slice/InitializationSlice";
import { NavigationSliceReducer } from "../slice/NavigationSlice";
import { ThemeSliceReducer } from "../slice/ThemeSlice";
import { UserSliceReducer } from "../slice/UserSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            analytics: AnalyticsSliceReducer,
            user: UserSliceReducer,
            initialization: InitializationSliceReducer,
            guildCache: GuildCacheReducer,
            theme: ThemeSliceReducer,
            navigation: NavigationSliceReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
