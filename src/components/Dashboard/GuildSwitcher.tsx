"use client";

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import usePreviousValue from "@/hooks/usePreviousValue";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    NavbarItem,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const GuildSwitcher: FC = () => {
    const { currentGuild, user } = useAuthWithCheck();
    const previousGuild = usePreviousValue(currentGuild);
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());

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
                {user.guilds.map(guild => (
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
                    >
                        {guild.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default GuildSwitcher;
