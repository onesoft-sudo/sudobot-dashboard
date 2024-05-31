import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type RootConfigSliceData = {
    prefix: string;
};
type RootConfigSliceState = {
    data: RootConfigSliceData;
    previous?: RootConfigSliceData;
};

const initialState: RootConfigSliceState = {
    data: {
        prefix: "-",
    },
};

const RootConfigSlice = createSlice({
    name: "rootConfig",
    initialState,
    reducers: {
        updateRootConfig: (state, action: PayloadAction<Partial<RootConfigSliceData>>) => {
            state.previous = { ...state.data };
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        resetRootConfig: (state) => {
            state.data = state.previous ?? initialState.data;
        },
        commitRootConfig: (state) => {
            state.previous = undefined;
        },
    },
});

export const { commitRootConfig, resetRootConfig, updateRootConfig } = RootConfigSlice.actions;
export default RootConfigSlice.reducer;
