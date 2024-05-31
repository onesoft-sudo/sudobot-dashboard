import { configureStore } from "@reduxjs/toolkit";
import AnalyticsSliceReducer from "../slice/AnalyticsSlice";
import AntiRaidConfigSliceReducer from "../slice/AntiRaidConfigSlice";
import CommandConfigSliceReducer from "../slice/CommandConfigSlice";
import GuildCacheReducer from "../slice/GuildCacheSlice";
import InitializationSliceReducer from "../slice/InitializationSlice";
import MessageRuleListReducer from "../slice/MessageRuleListSlice";
import ModalSliceReducer from "../slice/ModalSlice";
import NavigationSliceReducer from "../slice/NavigationSlice";
import RootConfigSliceReducer from "../slice/RootConfigSlice";
import RuleModerationConfigSliceReducer from "../slice/RuleModerationConfigSlice";
import ThemeSliceReducer from "../slice/ThemeSlice";
import ToastManagerReducer from "../slice/ToastManagerSlice";
import UnsavedChangesSliceReducer from "../slice/UnsavedChangesSlice";
import UserSliceReducer from "../slice/UserSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            analytics: AnalyticsSliceReducer,
            user: UserSliceReducer,
            initialization: InitializationSliceReducer,
            guildCache: GuildCacheReducer,
            theme: ThemeSliceReducer,
            navigation: NavigationSliceReducer,
            messageRuleList: MessageRuleListReducer,
            unsavedChanges: UnsavedChangesSliceReducer,
            ruleModerationConfig: RuleModerationConfigSliceReducer,
            modals: ModalSliceReducer,
            toastManager: ToastManagerReducer,
            antiRaidConfig: AntiRaidConfigSliceReducer,
            rootConfig: RootConfigSliceReducer,
            commandConfig: CommandConfigSliceReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
