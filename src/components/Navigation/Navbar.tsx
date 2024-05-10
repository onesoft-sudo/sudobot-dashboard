"use client";

import { links } from "@/config/navbar";
import { useAppInitialized } from "@/hooks/utils";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type FC } from "react";
import { MdMenu } from "react-icons/md";
import Brand from "../Branding/Brand";
import Controls from "./Controls";
import styles from "./Navbar.module.css";
import NavbarMobile from "./NavbarMobile";

const Navbar: FC = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const initialized = useAppInitialized();

    return (
        <>
            <NavbarMobile open={open} setOpen={setOpen} />

            <nav className={styles.navbar}>
                {initialized && (
                    <Button sx={{ minWidth: 0 }} className={styles.menuButton} onClick={() => setOpen(true)}>
                        <MdMenu size="1.5rem" />
                    </Button>
                )}

                <Brand />

                <ul>
                    {Object.entries(links).map(([key, value]) => (
                        <li key={key}>
                            <Link href={value.href} className={pathname === value.href ? styles.activeLink : ""}>
                                {value.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Controls />
            </nav>
        </>
    );
};

export default Navbar;
