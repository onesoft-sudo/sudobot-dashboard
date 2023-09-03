"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import useLoggedIn from "@/hooks/useLoggedIn";
import { sidebarItems } from "@/utils/links";
import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import styles from "../../styles/Sidebar.module.css";
import Link from "../Router/Link";

const Sidebar: FC = () => {
    const pathname = usePathname();
    const { currentGuild } = useAuthContext();

    if (!useLoggedIn() || !currentGuild) {
        return <></>;
    }

    return (
        <aside className={`h-[100%]`}>
            <div className={styles.items}>
                {sidebarItems.map((item, index) => (
                    <Fragment key={index}>
                        {index === sidebarItems.length - 1 && (
                            <div className={styles.spacer}></div>
                        )}
                        <Link
                            href={item.url.replaceAll(
                                "{id}",
                                currentGuild?.id ?? "__"
                            )}
                            className={
                                styles.item +
                                (pathname ===
                                item.url.replaceAll(
                                    "{id}",
                                    currentGuild?.id ?? "__"
                                )
                                    ? ` ${styles.activeItem}`
                                    : "")
                            }
                        >
                            <item.icon className={styles.icon} />
                            <span>{item.name}</span>
                        </Link>
                    </Fragment>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
