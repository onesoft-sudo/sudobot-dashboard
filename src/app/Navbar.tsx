"use client";

import { FC } from "react";
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "./icon.png";
import Link from "next/link";

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
                    <Link color="foreground" href="/features">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Documentation
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
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
