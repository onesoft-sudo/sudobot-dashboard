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

import { useAuthContext } from "@/contexts/AuthContext";
import useIsMobile from "@/hooks/useIsMobile";
import { navbarLinks } from "@/utils/links";
import { isDashboardPath } from "@/utils/utils";
import { Button as MUIButton, styled } from "@mui/material";
import {
    Button,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Navbar as NextUINavbar,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { MdMenu } from "react-icons/md";
import logo from "../../images/logo.png";
import GuildSwitcher from "../Dashboard/GuildSwitcher";
import Link from "../Router/Link";
import Announcement from "./Announcement";
import MobileNavbar from "./MobileNavbar";
import Profile from "./Profile";

const Navbar: FC = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { user } = useAuthContext();
    const isMobile = useIsMobile();

    const CustomButton = styled(MUIButton)({
        minWidth: 0,
        padding: "2px",
        margin: 0,
        color: "white",
    });

    return (
        <div>
            <NextUINavbar
                shouldHideOnScroll
                isBordered
                maxWidth={isDashboardPath(pathname!) ? "full" : "xl"}
            >
                {isMobile && (
                    <div className="md:hidden">
                        <CustomButton onClick={() => setIsMenuOpen(true)}>
                            <MdMenu size={25} />
                        </CustomButton>
                    </div>
                )}

                <NavbarBrand className="cursor-pointer">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logo.src}
                            alt="[Logo]"
                            width={40}
                            height={40}
                        />
                        <p className="font-bold text-inherit ml-3">SudoBot</p>
                    </Link>
                </NavbarBrand>
                <NavbarContent
                    className="hidden sm:flex gap-4"
                    justify="center"
                >
                    {navbarLinks.map(link => (
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

                {user !== undefined && !user && (
                    <NavbarContent as="div" justify="end">
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
                    </NavbarContent>
                )}

                {user !== undefined && user && (
                    <NavbarContent as="div" justify="end">
                        <NavbarItem>
                            <div className="hidden md:flex">
                                <GuildSwitcher />
                            </div>
                        </NavbarItem>

                        <Profile />
                    </NavbarContent>
                )}
            </NextUINavbar>
            <MobileNavbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            {pathname === "/" && <Announcement show={true} />}
        </div>
    );
};

export default Navbar;
