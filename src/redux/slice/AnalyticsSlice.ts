import { createSlice } from "@reduxjs/toolkit";

type AnalyticsState = {
    data: string[];
    loading: boolean;
    error: string | null;
};

const initialState: AnalyticsState = {
    data: [],
    loading: false,
    error: null,
};

const slice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        fetchAnalytics: (state) => {
            state.loading = true;
        },
        fetchAnalyticsSuccess: (
            state,
            action: {
                payload: string[];
                type: string;
            }
        ) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchAnalyticsError: (
            state,
            action: {
                payload: string;
                type: string;
            }
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchAnalytics, fetchAnalyticsSuccess, fetchAnalyticsError } = slice.actions;
export const AnalyticsSliceReducer = slice.reducer;
