import { APIMessageRule } from "@/types/APIMessageRule";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type RuleModerationConfigSliceState = {
    data: {
        enabled: boolean;
        rules: APIMessageRule[];
    };
    previousData?: {
        enabled: boolean;
        rules: APIMessageRule[];
    };
};

const initialState: RuleModerationConfigSliceState = {
    data: {
        enabled: true,
        rules: [],
    },
};

const RuleModerationConfigSlice = createSlice({
    name: "ruleModerationConfig",
    initialState,
    reducers: {
        updateRuleModerationConfig(state, action: PayloadAction<Partial<RuleModerationConfigSliceState["data"]>>) {
            if (!state.previousData) {
                state.previousData = { ...state.data };
            }

            state.data = { ...state.data, ...action.payload };
        },
        resetRuleModerationConfig(state) {
            if (state.previousData) {
                state.data = state.previousData;
                state.previousData = undefined;
            }
        },
        commitRuleModerationConfig(state) {
            state.previousData = undefined;
        },
    },
});

export const { updateRuleModerationConfig, resetRuleModerationConfig, commitRuleModerationConfig } =
    RuleModerationConfigSlice.actions;
export default RuleModerationConfigSlice.reducer;
