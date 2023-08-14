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

const Profile: FC = () => {
    const { user, dispatch } = useAuthWithCheck();
    const router = useRouterContext();

    const logout = () => {
        dispatch?.({ type: AuthContextAction.Logout });
    };

    return (
        <>
            {user && (
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button
                            disableRipple
                            variant="light"
                            className="pr-1 min-w-[0]"
                        >
                            <Avatar
                                isBordered
                                as="span"
                                className="transition-transform"
                                color="primary"
                                name={user.name ?? user.username}
                                size="sm"
                                src="https://cdn.discordapp.com/avatars/774553653394538506/a_4e37d385e285b48a86382109db48662e.gif?size=4096"
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
                        <DropdownItem key="settings">
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
