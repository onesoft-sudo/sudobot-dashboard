import { APIMessageRule } from "@/types/APIMessageRule";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MessageRuleListSliceState = {
    editModalOpen: boolean;
    editingRule: APIMessageRule | null;
};

const initialState: MessageRuleListSliceState = {
    editingRule: null,
    editModalOpen: false,
};

const messageRuleListSlice = createSlice({
    name: "messageRuleList",
    initialState,
    reducers: {
        setEditModalState: (state, action: PayloadAction<{ isOpen: boolean; rule: APIMessageRule | null }>) => {
            state.editModalOpen = action.payload.isOpen;
            state.editingRule = action.payload.rule;
        },
    },
});

export const { setEditModalState } = messageRuleListSlice.actions;
export const messageRuleListReducer = messageRuleListSlice.reducer;
