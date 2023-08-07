"use client";

import {
    BOT_INVITE_REQUEST_URL,
    DOCS_FEATURES_URL,
    DOCS_URL,
} from "@/utils/links";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { MdMenu } from "react-icons/md";
import logo from "./icon.png";

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

            <NavbarContent justify="end">
                <NavbarItem className="flex">
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>

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
