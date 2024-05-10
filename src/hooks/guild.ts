import { getGuild, getGuilds } from "@/api/discord/guilds";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setCurrentGuildId } from "@/redux/slice/UserSlice";
import { Guild } from "@/types/Guild";
import { useQuery } from "@tanstack/react-query";

export const useGuilds = (ids: string[], enabled = true) => {
    const cache = useAppSelector((state) => state.guildCache);

    return useQuery({
        queryKey: ["guilds", ids],
        queryFn: async () => {
            const guilds: Guild[] = [];
            const missing = [];

            for (const id of ids) {
                if (cache.guilds[id]) {
                    guilds.push(cache.guilds[id]);
                } else {
                    missing.push(id);
                }
            }

            const fetched = await getGuilds(missing);
            return guilds.concat(fetched);
        },
        enabled,
    });
};

export const useSwitchGuild = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    return (id: string) => {
        if (user.guildIds?.includes(id)) {
            dispatch(setCurrentGuildId(id));
        }
    };
};

export const useCurrentGuild = () => {
    const user = useAppSelector((state) => state.user);
    const guilds = useAppSelector((state) => state.guildCache);

    return useQuery({
        queryKey: ["guild", user.currentGuildId],
        queryFn: async () => {
            if (!user.currentGuildId) {
                return undefined;
            }

            return guilds.guilds[user.currentGuildId] ?? (await getGuild(user.currentGuildId));
        },
        enabled: !!user.currentGuildId,
    });
};
