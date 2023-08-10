"use client";

import { AuthContextAction, useAuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import usePreviousValue from "@/hooks/usePreviousValue";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    NavbarItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const GuildSwitcher: FC = () => {
    const { currentGuild, user, dispatch } = useAuthContext();
    const previousGuild = usePreviousValue(currentGuild);
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
    const router = useRouterContext();
    const pathname = usePathname();

    useEffect(() => {
        if (!previousGuild && currentGuild) {
            setSelectedKeys(new Set([currentGuild.id]));
            console.log("Selected", currentGuild.id);
        }
    }, [currentGuild]);

    if (!currentGuild || !user) {
        return <></>;
    }

    return (
        <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        endContent={<FaChevronDown />}
                        variant="light"
                        startContent={
                            currentGuild.iconURL ? (
                                <img
                                    src={currentGuild.iconURL}
                                    height={20}
                                    width={20}
                                    style={{
                                        marginRight: 5,
                                    }}
                                />
                            ) : (
                                <></>
                            )
                        }
                    >
                        {currentGuild.name}
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                className="w-[250px]"
                itemClasses={{
                    base: "gap-4",
                }}
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={keys => {
                    if (typeof keys === "string") {
                        return;
                    }

                    setSelectedKeys(keys as Set<string>);
                }}
            >
                {user.guilds.map((guild, index) => (
                    <DropdownItem
                        startContent={
                            guild.iconURL ? (
                                <img
                                    src={guild.iconURL}
                                    height={20}
                                    width={20}
                                />
                            ) : (
                                <></>
                            )
                        }
                        key={guild.id}
                        onClick={() => {
                            dispatch?.({
                                type: AuthContextAction.SwitchGuild,
                                payload: index,
                            });

                            if (
                                pathname.startsWith("/dashboard") ||
                                pathname.startsWith("/settings")
                            ) {
                                router?.push(
                                    pathname.replace(currentGuild.id, guild.id)
                                );
                            }
                        }}
                    >
                        {guild.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default GuildSwitcher;
