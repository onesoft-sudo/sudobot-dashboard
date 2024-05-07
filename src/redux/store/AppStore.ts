import { configureStore } from "@reduxjs/toolkit";
import { AnalyticsSliceReducer } from "../slice/AnalyticsSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            analytics: AnalyticsSliceReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
