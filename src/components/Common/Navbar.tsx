"use client";

import { AuthContextAction } from "@/contexts/AuthContext";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import {
    BOT_INVITE_REQUEST_URL,
    DOCS_FEATURES_URL,
    DOCS_URL,
    SUPPORT_EMAIL_ADDRESS,
} from "@/utils/links";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Navbar as NextUINavbar,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { MdMenu } from "react-icons/md";
import logo from "../../images/logo.png";

const links = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Features",
        url: DOCS_FEATURES_URL,
    },
    {
        name: "Documentation",
        url: DOCS_URL,
    },
    {
        name: "Invite",
        url: BOT_INVITE_REQUEST_URL,
    },
];

const Navbar: FC = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
    const { user, dispatch } = useAuthWithCheck();

    const logout = () => {
        dispatch?.({ type: AuthContextAction.Logout });
    };

    return (
        <NextUINavbar
            onMenuOpenChange={setIsMenuOpen}
            shouldHideOnScroll={true}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
                icon={<MdMenu size={30} />}
            />
            <NavbarBrand>
                <Image src={logo.src} alt="[Logo]" width={40} height={40} />
                <p className="font-bold text-inherit ml-3">SudoBot</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {links.map(link => (
                    <NavbarItem
                        key={`${link.name}_${link.url}`}
                        isActive={link.url === pathname}
                    >
                        <Link color="foreground" href={link.url}>
                            {link.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {user !== undefined && (
                <NavbarContent as="div" justify="end">
                    {!user && (
                        <NavbarItem className="flex">
                            <Button
                                as={Link}
                                color="primary"
                                href="/login"
                                variant="flat"
                            >
                                Login
                            </Button>
                        </NavbarItem>
                    )}

                    {user && (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name={user.name ?? user.username}
                                    size="sm"
                                    src="https://cdn.discordapp.com/avatars/774553653394538506/a_4e37d385e285b48a86382109db48662e.gif?size=4096"
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                            >
                                <DropdownItem
                                    key="profile"
                                    className="h-14 gap-2"
                                >
                                    <p className="font-semibold">
                                        Signed in as
                                    </p>
                                    <p className="font-semibold">
                                        {user.name ?? user.username}
                                        {user.name
                                            ? ` (@${user.username})`
                                            : ""}
                                    </p>
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
                </NavbarContent>
            )}

            <NavbarMenu>
                {links.map((link, index) => (
                    <NavbarMenuItem key={`${link.name}_${link.url}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === links.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            className="w-full"
                            href={link.url}
                        >
                            {link.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </NextUINavbar>
    );
};

export default Navbar;
