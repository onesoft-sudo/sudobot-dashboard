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

import { AuthContextAction } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { SUPPORT_EMAIL_ADDRESS } from "@/utils/links";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Profile: FC = () => {
    const { user, dispatch } = useAuthWithCheck();
    const router = useRouterContext();

    const logout = () => {
        dispatch?.({ type: AuthContextAction.Logout });
        router?.push("/login");
    };

    return (
        <>
            {user && (
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button
                            disableRipple
                            variant="light"
                            endContent={
                                <FaChevronDown className="hidden md:inline-block" />
                            }
                            className="pr-1 min-w-[0]"
                        >
                            <Avatar
                                isBordered
                                as="span"
                                className="transition-transform"
                                color="primary"
                                name={user.name ?? user.username}
                                size="sm"
                                src={user.avatarURL}
                            />

                            <span className="ml-2 hidden md:inline-block">
                                {user.name ?? user.username}
                            </span>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem
                            onClick={() => router?.push("/dashboard")}
                            key="dashboard"
                            className="h-14 gap-2"
                        >
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">
                                {user.name ?? user.username}
                                {user.name ? ` (@${user.username})` : ""}
                            </p>
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => router?.push("/dashboard")}
                            key="dashboard-2"
                        >
                            Dashboard
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => router?.push("/account")}
                            key="settings"
                        >
                            Account Settings
                        </DropdownItem>
                        <DropdownItem
                            key="support"
                            onClick={() =>
                                location.assign(SUPPORT_EMAIL_ADDRESS)
                            }
                        >
                            Contact Support
                        </DropdownItem>
                        <DropdownItem
                            key="logout"
                            color="danger"
                            onClick={logout}
                        >
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
        </>
    );
};

export default Profile;
