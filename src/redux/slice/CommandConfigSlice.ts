import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CommandConfigSliceData = {
    allowed_modes: Array<"legacy" | "interactions">;
};
type CommandConfigSliceState = {
    data: CommandConfigSliceData;
    previous?: CommandConfigSliceData;
};

const initialState: CommandConfigSliceState = {
    data: {
        allowed_modes: ["legacy", "interactions"],
    },
};

const CommandConfigSlice = createSlice({
    name: "commandConfig",
    initialState,
    reducers: {
        updateCommandConfig: (state, action: PayloadAction<Partial<CommandConfigSliceData>>) => {
            state.previous = { ...state.data };
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        resetCommandConfig: (state) => {
            state.data = state.previous ?? initialState.data;
        },
        commitCommandConfig: (state) => {
            state.previous = undefined;
        },
    },
});

export const { commitCommandConfig, resetCommandConfig, updateCommandConfig } = CommandConfigSlice.actions;
export default CommandConfigSlice.reducer;
