import { getChannels } from "@/api/guild/channels";
import { useCurrentUserInfo } from "@/hooks/user";
import { Box } from "@mui/material";
import { DropdownItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import assert from "assert";
import { APIGuildChannel, ChannelType } from "discord-api-types/v10";
import { ComponentProps, ReactNode, useCallback } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AutoComplete from "./AutoComplete";

export enum EntityType {
    GuildMember = "member",
    Role = "role",
    Channel = "channel",
}

type EntitySelectProps<T extends FieldValues> = {
    type: EntityType;
    name: Path<T>;
    control?: Control<T>;
    label: string;
    placeholder?: string;
    errorMessage?: ReactNode;
    isInvalid?: boolean;
} & Partial<Omit<ComponentProps<typeof AutoComplete<T>>, "type" | "children">>;

function EntitySelect<T extends FieldValues>({ type, name, control, errorMessage, ...props }: EntitySelectProps<T>) {
    assert(type === EntityType.Channel);

    const guildId = useCurrentUserInfo().currentGuildId;

    const { data, status } = useQuery({
        queryFn: () => (guildId ? getChannels(guildId) : []) as Promise<{ id: string }[]>,
        queryKey: ["guild", guildId, "channels"],
    });

    const filter = useCallback(
        (channel: APIGuildChannel<ChannelType>, query: string) =>
            channel.name.toLowerCase().includes(query.toLowerCase()),
        [],
    );

    const getId = useCallback((entity: { id: string }) => entity.id, []);

    return (
        <>
            <Box display="grid" gridColumn={1}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <AutoComplete<T>
                                data={(data ?? []) as unknown as T[]}
                                filter={filter as any}
                                getId={getId as any}
                                onSelectionChange={field.onChange}
                                selectedKeys={field.value}
                                {...props}
                            >
                                {(channel) => <DropdownItem key={channel.id}>#{channel.name}</DropdownItem>}
                            </AutoComplete>
                        );
                    }}
                />
            </Box>

            {status === "error" && <p className="text-xs text-[#999]">Failed to fetch required information.</p>}
        </>
    );
}

export default EntitySelect;
