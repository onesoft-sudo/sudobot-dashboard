import { createSlice } from "@reduxjs/toolkit";

type InitializationSliceState = {
    initialized: boolean;
};

const initialState: InitializationSliceState = {
    initialized: false,
};

const InitializationSlice = createSlice({
    name: "initialization",
    initialState,
    reducers: {
        initialize: (state) => {
            state.initialized = true;
        },
    },
});

export const { initialize } = InitializationSlice.actions;
export default InitializationSlice.reducer;
