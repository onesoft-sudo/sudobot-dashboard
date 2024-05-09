import { configureStore } from "@reduxjs/toolkit";
import { AnalyticsSliceReducer } from "../slice/AnalyticsSlice";
import { UserSliceReducer } from "../slice/UserSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            analytics: AnalyticsSliceReducer,
            user: UserSliceReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
