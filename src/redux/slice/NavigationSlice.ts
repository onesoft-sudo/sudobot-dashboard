import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NavigationSliceState = {
    isLoading: boolean;
};

const initialState: NavigationSliceState = {
    isLoading: false,
};

const NavigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setLoading } = NavigationSlice.actions;
export default NavigationSlice.reducer;
