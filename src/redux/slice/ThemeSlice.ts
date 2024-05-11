import { createSlice } from "@reduxjs/toolkit";

type ThemeSliceState = {
    mode: "dark" | "light";
};

const initialState: ThemeSliceState = {
    mode: "dark",
};

const themeSlice = createSlice({
    name: "initialization",
    initialState,
    reducers: {
        toggle(state) {
            state.mode = state.mode === "dark" ? "light" : "dark";
        },
        setMode(state, action: { payload: "dark" | "light" }) {
            state.mode = action.payload;
        },
    },
});

export const { setMode, toggle } = themeSlice.actions;
export const ThemeSliceReducer = themeSlice.reducer;
