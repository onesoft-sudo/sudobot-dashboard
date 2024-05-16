import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MessageRuleListSliceState = {
    data: Record<
        string,
        | {
              draggingId: string | null;
              draggingIndex: number | null;
              currentTargetId: string | null;
              currentTargetIndex: number | null;
          }
        | undefined
    >;
};

const initialState: MessageRuleListSliceState = {
    data: {},
};

const messageRuleListSlice = createSlice({
    name: "messageRuleList",
    initialState,
    reducers: {
        setDraggingState: (
            state,
            action: PayloadAction<{ componentId: string; draggingIndex: number | null; draggingId: string | null }>,
        ) => {
            state.data[action.payload.componentId] = {
                ...state.data[action.payload.componentId]!,
                draggingId: action.payload.draggingId,
                draggingIndex: action.payload.draggingIndex,
            };
        },
    },
});

export const { setDraggingState } = messageRuleListSlice.actions;
export const messageRuleListReducer = messageRuleListSlice.reducer;
