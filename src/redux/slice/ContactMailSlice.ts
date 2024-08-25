import { createSlice } from "@reduxjs/toolkit";

type ContactMailState = {
    dialogOpen: boolean;
};

const initialState: ContactMailState = {
    dialogOpen: false,
};

const ContactMailSlice = createSlice({
    name: "contactMail",
    initialState,
    reducers: {
        openDialog: (state) => {
            state.dialogOpen = true;
        },
        closeDialog: (state) => {
            state.dialogOpen = false;
        },
        toggleDialog: (state) => {
            state.dialogOpen = !state.dialogOpen;
        },
    },
});

export const { openDialog, closeDialog, toggleDialog } =
    ContactMailSlice.actions;
export default ContactMailSlice.reducer;
