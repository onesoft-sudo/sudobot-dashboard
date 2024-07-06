import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DialogDetails = {
    id: string;
    isOpen: boolean;
    title: string;
    description: string;
    buttons?: DialogButton[];
    classes?: {
        icon?: string;
        iconWrapper?: string;
    };
};

export type DialogButton = {
    type: "primary" | "action" | "cancel";
    id: string;
    label: string;
};

export type DialogManagerState = {
    dialogs: DialogDetails[];
};

const initialState: DialogManagerState = {
    dialogs: [],
};

const DialogManagerSlice = createSlice({
    name: "dialogManager",
    initialState,
    reducers: {
        addDialog(state, action: PayloadAction<DialogDetails>) {
            state.dialogs.push(action.payload);
        },
        removeDialog(state, action: PayloadAction<string>) {
            state.dialogs = state.dialogs.filter((dialog) => dialog.id !== action.payload);
        },
        setDialogState(state, action: PayloadAction<{ id: string; isOpen: boolean }>) {
            const dialog = state.dialogs.find((dialog) => dialog.id === action.payload.id);

            if (dialog) {
                dialog.isOpen = action.payload.isOpen;
            }
        },
    },
});

export const { addDialog, removeDialog, setDialogState } = DialogManagerSlice.actions;
export default DialogManagerSlice.reducer;
