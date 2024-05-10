"use client";

import { links } from "@/config/navbar";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import Brand from "../Branding/Brand";
import Controls from "./Controls";
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

            <Controls className={styles.controls} />
        </nav>
    );
};

export default Navbar;
