"use client";

import { FC } from "react";
import styles from "@/styles/Navbar.module.css";
import Button from "@/components/Button/Button";
import Links from "@/components/Navigation/Links";
import BrandLogo from "./BrandLogo";
import Link from "next/link";
import { useIsDesktop } from "@/hooks/useDeviceType";
import IconButton from "../Button/IconButton";
import { MdMenu, MdSearch } from "react-icons/md";

const Navbar: FC = () => {
    const isDesktop = useIsDesktop();

    return (
        <nav className={styles.navbar}>
            {!isDesktop && (
                <IconButton>
                    <MdMenu size="1.4rem" />
                </IconButton>
            )}

            <Link href="/" className={styles.brand}>
                <BrandLogo />
                <span className={styles.brandName}>SudoBot</span>
            </Link>

            {isDesktop && (
                <ul className={styles.links}>
                    <Links />
                </ul>
            )}

            {isDesktop && (
                <div className={styles.buttons}>
                    <Button>Login</Button>
                </div>
            )}

            {!isDesktop && (
                <IconButton>
                    <MdSearch size="1.4rem" />
                </IconButton>
            )}
        </nav>
    );
};

export default Navbar;
