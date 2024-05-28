import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UnsavedChangesSliceState = {
    hasChanges: boolean;
};

const initialState: UnsavedChangesSliceState = {
    hasChanges: false,
};

const UnsavedChangesSlice = createSlice({
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

export const { setUnsavedChanges } = UnsavedChangesSlice.actions;
export default UnsavedChangesSlice.reducer;
