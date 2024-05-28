import { createSlice } from "@reduxjs/toolkit";

type ThemeSliceState = {
    mode: "dark" | "light";
};

const initialState: ThemeSliceState = {
    mode: "dark",
};

const ThemeSlice = createSlice({
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

export const { setMode, toggle } = ThemeSlice.actions;
export default ThemeSlice.reducer;
