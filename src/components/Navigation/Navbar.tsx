"use client";

import { links } from "@/config/navbar";
import { useAppInitialized } from "@/hooks/utils";
import { isDashboardPath } from "@/utils/utils";
import { Button } from "@mui/material";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState, type FC } from "react";
import { MdMenu } from "react-icons/md";
import Brand from "../Branding/Brand";
import Controls from "./Controls";
import Link from "./Link";
import styles from "./Navbar.module.css";
import NavbarLoadingProgress from "./NavbarLoadingProgress";
import NavbarMobile from "./NavbarMobile";

const Navbar: FC = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const initialized = useAppInitialized();

    return (
        <>
            <NavbarLoadingProgress />
            <NavbarMobile open={open} setOpen={setOpen} />

            <nav
                className={clsx(styles.navbar, {
                    [styles.onDashboard]: isDashboardPath(pathname),
                })}
            >
                {initialized && (
                    <Button sx={{ minWidth: 0 }} className={styles.menuButton} onClick={() => setOpen(true)}>
                        <MdMenu size="1.5rem" />
                    </Button>
                )}

                <Brand />

                <ul>
                    {links.map((value) =>
                        value.mobileOnly ? null : (
                            <li key={`${value.href}_${value.title}`}>
                                <Link href={value.href} className={pathname === value.href ? styles.activeLink : ""}>
                                    {value.title}
                                </Link>
                            </li>
                        ),
                    )}
                </ul>

                <Controls />
            </nav>
        </>
    );
};

export default Navbar;
