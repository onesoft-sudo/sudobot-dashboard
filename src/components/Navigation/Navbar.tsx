"use client";

import { links } from "@/config/navbar";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import Brand from "../Branding/Brand";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <Brand />

            <ul>
                {Object.entries(links).map(([key, value]) => (
                    <li key={key}>
                        <a href={value.href} className={pathname === value.href ? styles.activeLink : ""}>
                            {value.title}
                        </a>
                    </li>
                ))}
            </ul>

            <div>
                <Button color="primary" variant="flat" as={Link} href="/login">
                    Login
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
