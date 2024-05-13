"use client";

import { useSwitchGuild } from "@/hooks/guild";
import { useTimedState } from "@/hooks/utils";
import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { CircularProgress } from "@nextui-org/react";

export default function GuildList() {
    const guildCache = useAppSelector((state) => state.guildCache);
    const guilds = Object.values(guildCache.guilds);
    const switchGuild = useSwitchGuild();
    const [switchingGuild, setSwitchingGuild] = useTimedState<string | null>(null, 2000);

    return (
        <>
            <p className="text-base">
                SudoBot is currently in {guilds.length} servers where you have the required permissions to manage
                settings.
            </p>

            <ul className="mt-2 list-disc pl-5">
                {guilds.map((guild) => (
                    <li key={guild.id}>
                        <a
                            href="#"
                            className="link flex items-center"
                            onClick={() => {
                                setSwitchingGuild(guild.id);
                                switchGuild(guild.id);
                            }}
                        >
                            {guild.name}{" "}
                            {switchingGuild === guild.id && <CircularProgress size="sm" className="scale-[0.7]" />}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}
