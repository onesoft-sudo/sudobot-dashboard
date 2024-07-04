import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastDetails = {
    id: string;
    title?: string;
    contents: string;
    createdAt?: number;
    icon?: string;
    closeIn?: number;
    progress?: boolean;
};

type ToastManagerSliceType = {
    toasts: ToastDetails[];
};

const initialState: ToastManagerSliceType = {
    toasts: [],
};

const ToastManagerSlice = createSlice({
    name: "toastManager",
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<ToastDetails>) => {
            state.toasts.push(action.payload);
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
        },
        removeToasts(state, action: PayloadAction<string[]>) {
            state.toasts = state.toasts.filter((toast) => !action.payload.includes(toast.id));
        },
    },
});

export const { addToast, removeToast, removeToasts } = ToastManagerSlice.actions;
export default ToastManagerSlice.reducer;
