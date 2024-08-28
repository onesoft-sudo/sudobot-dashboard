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
        setOpenDialog: (state, action) => {
            state.dialogOpen = action.payload;
        },
    },
});

export const { openDialog, closeDialog, toggleDialog, setOpenDialog } =
    ContactMailSlice.actions;
export default ContactMailSlice.reducer;
