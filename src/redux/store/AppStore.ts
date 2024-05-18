import { configureStore } from "@reduxjs/toolkit";
import { AnalyticsSliceReducer } from "../slice/AnalyticsSlice";
import { ConfigSliceReducer } from "../slice/ConfigSlice";
import { GuildCacheReducer } from "../slice/GuildCacheSlice";
import { InitializationSliceReducer } from "../slice/InitializationSlice";
import { messageRuleListReducer } from "../slice/MessageRuleListSlice";
import { NavigationSliceReducer } from "../slice/NavigationSlice";
import { ThemeSliceReducer } from "../slice/ThemeSlice";
import { UnsavedChangesSliceReducer } from "../slice/UnsavedChangesSlice";
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
            messageRuleList: messageRuleListReducer,
            config: ConfigSliceReducer,
            unsavedChanges: UnsavedChangesSliceReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
