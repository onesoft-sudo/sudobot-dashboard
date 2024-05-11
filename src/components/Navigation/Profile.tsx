import { useCurrentUser, useLogout } from "@/hooks/user";
import { Button } from "@nextui-org/button";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { MdContactSupport, MdDashboard, MdOutlineLogout, MdSettings } from "react-icons/md";

export default function Profile() {
    const user = useCurrentUser();
    const logout = useLogout();

    if (!user) {
        return null;
    }

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button
                    disableRipple
                    variant="light"
                    endContent={<FaChevronDown className="hidden md:inline-block" />}
                    className="min-w-0 px-2"
                >
                    <Avatar
                        src={user.avatar}
                        alt={user.name}
                        as="span"
                        className="transition-transform"
                        size="sm"
                        isBordered
                        color="primary"
                        name={user.name ?? user.username}
                    />

                    <span className="ml-2 hidden lg:inline-block">{user.name ?? user.username}</span>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" variant="flat">
                <DropdownItem as={Link} href="/dashboard" key="dashboard" className="h-14 gap-2" showDivider>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">
                        {user.name ?? user.username}
                        {user.name ? ` (@${user.username})` : ""}
                    </p>
                </DropdownItem>
                <DropdownItem as={Link} href="/dashboard" key="goto_dashboard" startContent={<MdDashboard />}>
                    Go to Dashboard
                </DropdownItem>
                <DropdownItem as={Link} href="/account/settings" key="settings" startContent={<MdSettings />}>
                    Account Settings
                </DropdownItem>
                <DropdownItem
                    href="mailto:rakinar2@onesoftnet.eu.org"
                    key="contact"
                    startContent={<MdContactSupport />}
                >
                    Contact Support
                </DropdownItem>
                <DropdownItem
                    key="logout"
                    startContent={<MdOutlineLogout />}
                    className="text-danger"
                    color="danger"
                    onClick={logout}
                >
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
