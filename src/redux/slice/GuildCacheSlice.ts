import { Guild } from "@/types/Guild";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GuildCacheSliceState = {
    guilds: Record<string, Guild>;
};

const initialState: GuildCacheSliceState = {
    guilds: {},
};

const GuildCacheSlice = createSlice({
    name: "guildCache",
    initialState,
    reducers: {
        addGuild(state, action: PayloadAction<Guild>) {
            state.guilds[action.payload.id] = action.payload;
        },
        addGuilds(state, action: PayloadAction<Guild[]>) {
            action.payload.forEach((guild) => {
                state.guilds[guild.id] = guild;
            });
        },
    },
});

export const { addGuild, addGuilds } = GuildCacheSlice.actions;
export const GuildCacheReducer = GuildCacheSlice.reducer;
