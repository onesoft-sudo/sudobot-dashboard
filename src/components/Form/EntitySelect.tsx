import { getChannels } from "@/api/guild/channels";
import { getRoles } from "@/api/guild/roles";
import { useCurrentUserInfo } from "@/hooks/user";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { APIGuildChannel, ChannelType } from "discord-api-types/v10";
import { ComponentProps, ReactNode, useCallback, useMemo } from "react";
import {
    Control,
    Controller,
    FieldValues,
    Path,
    PathValue,
} from "react-hook-form";
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

function EntitySelect<T extends FieldValues>({
    type,
    name,
    control,
    errorMessage,
    label,
    ...props
}: EntitySelectProps<T>) {
    const guildId = useCurrentUserInfo().currentGuildId;

    const { data, status } = useQuery({
        queryFn: () =>
            (guildId
                ? type === EntityType.Channel
                    ? getChannels(guildId)
                    : type === EntityType.Role
                      ? getRoles(guildId)
                      : []
                : []) as Promise<{ id: string }[]>,
        queryKey: [
            "guild",
            guildId,
            type === EntityType.Channel ? "channels" : "roles",
        ],
    });

    const filter = useCallback(
        (channel: APIGuildChannel<ChannelType>, query: string) =>
            channel.name.toLowerCase().includes(query.toLowerCase()),
        [],
    );
    const getId = useCallback((entity: { id: string }) => entity.id, []);
    const filteredData = useMemo(() => {
        if (type === EntityType.Role) {
            return data?.filter((role) => role.id !== guildId);
        }

        return data;
    }, [data, type, guildId]);

    return (
        <>
            <Box display="grid" gridColumn={1}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={new Set<string>() as PathValue<T, Path<T>>}
                    render={({ field, fieldState }) => {
                        return (
                            <AutoComplete<T>
                                label={label}
                                data={(filteredData ?? []) as unknown as T[]}
                                filter={filter as any}
                                getId={getId as any}
                                selectedItems={new Set(field.value)}
                                setSelectedItems={(set) =>
                                    field.onChange(Array.from(set))
                                }
                                findItemWithString={(data, query) =>
                                    data.find((a) => a.id === query)
                                }
                                errorMessage={
                                    errorMessage ?? fieldState.error?.message
                                }
                                renderItem={(item) =>
                                    type === EntityType.Channel
                                        ? `#${item.name}`
                                        : `@${item.name}`
                                }
                                {...props}
                            />
                        );
                    }}
                />
            </Box>

            {status === "error" && (
                <p className="text-xs text-[#999]">
                    Failed to fetch required information.
                </p>
            )}
        </>
    );
}

export default EntitySelect;
