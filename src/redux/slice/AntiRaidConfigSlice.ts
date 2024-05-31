import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AntiRaidConfigSliceData = {
    enabled: boolean;
    threshold: number;
    timeframe: number;
    actions: Array<"lock" | "kick" | "none">;
    channels_to_lock?: string[];
};

type AntiRaidConfigSliceType = {
    data: AntiRaidConfigSliceData;
    previous?: AntiRaidConfigSliceData;
};

const initialState: AntiRaidConfigSliceType = {
    data: {
        enabled: false,
        threshold: 0,
        timeframe: 0,
        actions: [],
    },
};

const AntiRaidConfigSlice = createSlice({
    name: "antiRaidConfig",
    initialState,
    reducers: {
        updateAntiRaidConfig: (state, action: PayloadAction<Partial<AntiRaidConfigSliceType["data"]>>) => {
            state.previous = { ...state.data };
            state.data = { ...state.data, ...action.payload };
        },
        resetAntiRaidConfig: (state) => {
            state.data = state.previous ? { ...state.previous } : initialState.data;
        },
        commitAntiRaidConfig: (state) => {
            state.previous = undefined;
        },
    },
});

export const { updateAntiRaidConfig, resetAntiRaidConfig, commitAntiRaidConfig } = AntiRaidConfigSlice.actions;
export default AntiRaidConfigSlice.reducer;
