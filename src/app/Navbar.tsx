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
    Navbar as NextUINavbar,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import logo from "./icon.png";

const Navbar: FC = () => {
    return (
        <NextUINavbar shouldHideOnScroll={true}>
            <NavbarBrand>
                <Image src={logo.src} alt="[Logo]" width={40} height={40} />
                <p className="font-bold text-inherit ml-3">SudoBot</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href={DOCS_FEATURES_URL}>
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href={DOCS_URL}>
                        Documentation
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href={BOT_INVITE_REQUEST_URL}>
                        Invite
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    );
};

export default Navbar;
