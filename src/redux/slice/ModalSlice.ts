import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalSliceState = {
    logoutFromAllDevicesConfirmation: boolean;
};

const initialState: ModalSliceState = {
    logoutFromAllDevicesConfirmation: false,
};

const ModalSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        open: (state, action: PayloadAction<keyof ModalSliceState>) => {
            state[action.payload] = true;
        },
        close: (state, action: PayloadAction<keyof ModalSliceState>) => {
            state[action.payload] = false;
        },
    },
});

export const { close, open } = ModalSlice.actions;
export const ModalSliceReducer = ModalSlice.reducer;
