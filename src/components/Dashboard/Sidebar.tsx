"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import useLoggedIn from "@/hooks/useLoggedIn";
import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import {
    MdBarChart,
    MdLockOutline,
    MdSettings,
    MdShield,
    MdTerminal,
} from "react-icons/md";
import styles from "../../styles/Sidebar.module.css";
import Link from "../Router/Link";

const items = [
    {
        name: "Dashboard",
        url: "/dashboard/{id}",
        icon: MdBarChart,
    },
    {
        name: "Commands",
        url: "/settings/{id}/commands",
        icon: MdTerminal,
    },
    {
        name: "Auto Moderation",
        url: "/settings/{id}/automod",
        icon: MdShield,
    },
    {
        name: "Permissions",
        url: "/settings/{id}/permissions",
        icon: MdLockOutline,
    },
    {
        name: "Account Settings",
        url: "/account",
        icon: MdSettings,
    },
];

const Sidebar: FC = () => {
    const pathname = usePathname();
    const { currentGuild } = useAuthContext();

    if (!useLoggedIn() || !currentGuild) {
        return <></>;
    }

    return (
        <aside className={`h-[100%]`}>
            <div className={styles.items}>
                {items.map((item, index) => (
                    <Fragment key={index}>
                        {index === items.length - 1 && (
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
