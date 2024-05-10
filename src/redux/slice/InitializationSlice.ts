import { createSlice } from "@reduxjs/toolkit";

type InitializationSliceState = {
    initialized: boolean;
};

const initialState: InitializationSliceState = {
    initialized: false,
};

const initializationSlice = createSlice({
    name: "initialization",
    initialState,
    reducers: {
        initialize: (state) => {
            state.initialized = true;
        },
    },
});

export const { initialize } = initializationSlice.actions;
export const InitializationSliceReducer = initializationSlice.reducer;
