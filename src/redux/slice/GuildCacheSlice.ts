import { Guild } from "@/types/Guild";
import { SliceInitializer } from "@/types/SliceInitializer";
import { StorageKeys } from "@/types/StorageKeys";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GuildCacheSliceState = {
    guilds: Record<string, Guild>;
};

const initialState: GuildCacheSliceState = {
    guilds: {},
};

export const guildCacheSliceInitializer: SliceInitializer = (store) => {
    const local = localStorage.getItem(StorageKeys.Guilds);
    const session = sessionStorage.getItem(StorageKeys.Guilds);
    const guilds = local ? JSON.parse(local) : session ? JSON.parse(session) : undefined;

    if (guilds) {
        store.dispatch(addGuilds({ guilds }));
    }
};

const GuildCacheSlice = createSlice({
    name: "guildCache",
    initialState,
    reducers: {
        addGuild(state, action: PayloadAction<Guild>) {
            state.guilds[action.payload.id] = action.payload;
        },
        addGuilds(state, action: PayloadAction<{ guilds: Guild[]; save?: boolean; storage?: "local" | "session" }>) {
            action.payload.guilds.forEach((guild) => {
                state.guilds[guild.id] = guild;
            });

            if (action.payload.save) {
                const json = JSON.stringify(action.payload.guilds);

                if (action.payload.storage === "local") {
                    localStorage.setItem(StorageKeys.Guilds, json);
                } else if (action.payload.storage === "session") {
                    sessionStorage.setItem(StorageKeys.Guilds, json);
                } else {
                    throw new Error("Invalid storage type");
                }
            }
        },
        clearCachedGuilds(state) {
            state.guilds = {};
            localStorage.removeItem(StorageKeys.Guilds);
            sessionStorage.removeItem(StorageKeys.Guilds);
        },
    },
});

export const { addGuild, addGuilds, clearCachedGuilds } = GuildCacheSlice.actions;
export default GuildCacheSlice.reducer;
