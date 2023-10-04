/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

"use client";

import { AuthContextAction, useAuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import usePreviousValue from "@/hooks/usePreviousValue";
import { isDashboardPath } from "@/utils/utils";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { useParams, usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const GuildSwitcher: FC<{
    buttonClasses?: string;
    onGuildSwitch?: () => any;
    forceShow?: boolean;
}> = ({ buttonClasses = "", onGuildSwitch, forceShow }) => {
    const { currentGuild, user, dispatch } = useAuthContext();
    const previousGuild = usePreviousValue(currentGuild);
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
    const router = useRouterContext();
    const pathname = usePathname()!;
    const { id } = useParams()!;

    useEffect(() => {
        if (!previousGuild && currentGuild) {
            setSelectedKeys(new Set([currentGuild.id]));
            console.log("Selected", currentGuild.id);
        }
    }, [currentGuild]);

    if (!currentGuild || !user) {
        return <></>;
    }

    if (isDashboardPath(pathname) && !user.guilds.find(g => g.id === id)) {
        return <></>;
    }

    return (
        <Dropdown>
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
                                alt=""
                            />
                        ) : (
                            <></>
                        )
                    }
                    className={buttonClasses}
                >
                    {currentGuild.name}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dynamic Actions"
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
                                    alt=""
                                />
                            ) : (
                                <></>
                            )
                        }
                        key={guild.id}
                        onClick={() => {
                            if (isDashboardPath(pathname)) {
                                onGuildSwitch?.();
                            }

                            dispatch?.({
                                type: AuthContextAction.SwitchGuild,
                                payload: guild.id,
                            });

                            if (isDashboardPath(pathname)) {
                                console.log("Route change");
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
