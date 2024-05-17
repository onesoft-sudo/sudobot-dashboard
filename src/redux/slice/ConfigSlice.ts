import { APIMessageRule, APIMessageRuleType } from "@/types/APIMessageRule";
import { APIModerationActionType } from "@/types/APIModerationAction";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ConfigSliceState = {
    rule_moderation?: {
        enabled?: boolean;
        rules?: Array<APIMessageRule>;
    };
};

const initialState: ConfigSliceState = {
    rule_moderation: {
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

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        updateRuleModerationConfig: (
            state,
            action: PayloadAction<{
                enabled?: boolean;
                rules?: Array<APIMessageRule>;
            } | null>,
        ) => {
            if (action.payload === null) {
                state.rule_moderation = undefined;
                return;
            }

            state.rule_moderation ??= {};
            state.rule_moderation.enabled = action.payload?.enabled ?? state.rule_moderation?.enabled;
            state.rule_moderation.rules = action.payload?.rules ?? state.rule_moderation?.rules;
        },
    },
});

export const { updateRuleModerationConfig } = configSlice.actions;
export const ConfigSliceReducer = configSlice.reducer;
