import { APIMessageRule, APIMessageRuleType } from "@/types/APIMessageRule";
import { APIModerationActionType } from "@/types/APIModerationAction";
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
        rules: [
            {
                enabled: true,
                id: "1n",
                type: APIMessageRuleType.Regex,
                mode: "normal",
                actions: [APIModerationActionType.DeleteMessage].map((action) => ({
                    enabled: true,
                    type: action,
                })),
            },
            {
                enabled: true,
                id: "2n",
                type: APIMessageRuleType.Embed,
                mode: "normal",
                actions: [APIModerationActionType.DeleteMessage].map((action) => ({
                    enabled: true,
                    type: action,
                })),
            },
            {
                enabled: false,
                id: "3n",
                type: APIMessageRuleType.Invite,
                mode: "normal",
                actions: [APIModerationActionType.DeleteMessage, APIModerationActionType.Kick].map((action) => ({
                    enabled: true,
                    type: action,
                })),
            },
            {
                enabled: true,
                id: "4n",
                type: APIMessageRuleType.Word,
                mode: "invert",
                actions: [
                    APIModerationActionType.DeleteMessage,
                    APIModerationActionType.Warn,
                    APIModerationActionType.Ban,
                ].map((action) => ({
                    enabled: true,
                    type: action,
                })),
            },
            {
                enabled: true,
                id: "5n",
                type: APIMessageRuleType.File,
                mode: "normal",
                actions: [APIModerationActionType.DeleteMessage].map((action) => ({
                    enabled: true,
                    type: action,
                })),
            },
            {
                enabled: true,
                id: "6n",
                type: APIMessageRuleType.Domain,
                mode: "normal",
                actions: [APIModerationActionType.DeleteMessage].map((action) => ({
                    enabled: true,
                    type: action,
                })),
            },
        ],
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
