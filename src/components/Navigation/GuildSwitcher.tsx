import { useGuilds, useSwitchGuild } from "@/hooks/guild";
import { useCurrentUserInfo } from "@/hooks/user";
import { getGuildIconURL } from "@/utils/discord";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ComponentProps } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Icon from "../Images/Icon";

type GuildSwitcherProps = {
    classNames?: {
        container?: string;
        button?: string;
    };
    buttonProps?: ComponentProps<typeof Button>;
};

export default function GuildSwitcher({ classNames, buttonProps }: GuildSwitcherProps) {
    const { currentGuildId, guildIds, user } = useCurrentUserInfo();
    const guilds = useGuilds(guildIds ?? [], !!guildIds?.length);
    const switchGuild = useSwitchGuild();

    if (!currentGuildId || !guildIds || !user) {
        return null;
    }

    const currentGuild = currentGuildId ? guilds.data?.find((guild) => guild.id === currentGuildId) : guilds.data?.[0];

    return (
        <Dropdown placement="bottom-end" className={classNames?.container}>
            <DropdownTrigger>
                <Button
                    variant="light"
                    endContent={<FaChevronDown />}
                    className={"min-w-0 px-2"}
                    disableRipple
                    {...buttonProps}
                >
                    <Icon
                        src={currentGuild ? getGuildIconURL(currentGuild) : undefined}
                        alt={currentGuild?.name ?? "[Network Error]"}
                        height={24}
                        width={24}
                        iconSize={24}
                    />

                    <span className="ml-1">
                        {guilds.isError ? "[Network Error]" : currentGuild?.name ?? "[Network Error]"}
                    </span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Static Actions"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={[currentGuild?.id ?? "0"]}
                onSelectionChange={(keys) => switchGuild(Array.from(keys)[0] as string)}
                disabledKeys={guilds.isError || !guilds.data ? ["0"] : []}
            >
                {guilds.data?.map((guild) => (
                    <DropdownItem
                        key={guild.id}
                        startContent={
                            <Icon src={getGuildIconURL(guild)} alt={guild.name} height={24} width={24} iconSize={24} />
                        }
                    >
                        {guild.name}
                    </DropdownItem>
                )) ?? (
                    <>
                        <DropdownItem key="0">{`[Network Error]`}</DropdownItem>
                    </>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
