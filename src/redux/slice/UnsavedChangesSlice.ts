import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UnsavedChangesSliceState = {
    hasChanges: boolean;
};

const initialState: UnsavedChangesSliceState = {
    hasChanges: false,
};

let saveHandlers = new Map<string, () => void>();

export const addSaveHandler = (name: string, handler: () => void) => {
    saveHandlers.set(name, handler);
};

export const runSaveHandlers = () => {
    saveHandlers.forEach((handler) => handler());
    saveHandlers.clear();
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
