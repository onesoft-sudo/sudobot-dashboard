"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import {
    BOT_INVITE_REQUEST_URL,
    DOCS_FEATURES_URL,
    DOCS_URL,
} from "@/utils/links";
import { isDashboardPath } from "@/utils/utils";
import {
    Button,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Navbar as NextUINavbar,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { MdMenu } from "react-icons/md";
import logo from "../../images/logo.png";
import GuildSwitcher from "../Dashboard/GuildSwitcher";
import Link from "../Router/Link";
import Profile from "./Profile";

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
    const { user } = useAuthContext();

    return (
        <NextUINavbar
            onMenuOpenChange={setIsMenuOpen}
            shouldHideOnScroll
            isBordered
            maxWidth={isDashboardPath(pathname) ? "full" : undefined}
        >
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
                icon={<MdMenu size={30} />}
            />

            <NavbarBrand className="cursor-pointer">
                <Link href="/" className="flex items-center">
                    <Image src={logo.src} alt="[Logo]" width={40} height={40} />
                    <p className="font-bold text-inherit ml-3">SudoBot</p>
                </Link>
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
                    {user && (
                        <div className="hidden md:flex">
                            <GuildSwitcher />
                        </div>
                    )}
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

                    {user && <Profile />}
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
