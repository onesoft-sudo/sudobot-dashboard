import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UnsavedChangesSliceState = {
    hasChanges: boolean;
};

const initialState: UnsavedChangesSliceState = {
    hasChanges: false,
};

const unsavedChangesSlice = createSlice({
    name: "unsavedChanges",
    initialState,
    reducers: {
        setUnsavedChanges: (
            state,
            action: PayloadAction<{
                hasChanges: boolean;
            }>,
        ) => {
            state.hasChanges = action.payload.hasChanges;
        },
    },
});

export const { setUnsavedChanges } = unsavedChangesSlice.actions;
export const UnsavedChangesSliceReducer = unsavedChangesSlice.reducer;
