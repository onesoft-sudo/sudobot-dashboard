import { GuildConfiguration } from "@/types/GuildConfiguration";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// TODO: This might be removed in the future

type GuildConfigurationSliceType = {
    configuration?: GuildConfiguration;
    status: "loading" | "success" | "error";
};

const initialState: GuildConfigurationSliceType = {
    configuration: undefined,
    status: "loading",
};

const GuildConfigurationSlice = createSlice({
    name: "guildConfiguration",
    initialState,
    reducers: {
        updateGuildConfiguration(state, action: PayloadAction<GuildConfiguration>) {
            state.configuration = {
                ...state.configuration,
                ...action.payload,
            };
        },
        setGuildConfiguration(state, action: PayloadAction<GuildConfiguration>) {
            state.configuration = action.payload;
        },
    },
});

export const { updateGuildConfiguration, setGuildConfiguration } = GuildConfigurationSlice.actions;
export default GuildConfigurationSlice.reducer;
