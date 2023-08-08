"use client";

import Link from "next/link";
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

const items = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: MdBarChart,
    },
    {
        name: "Auto Moderation",
        url: "/settings/automod",
        icon: MdShield,
    },
    {
        name: "Commands",
        url: "/settings/command",
        icon: MdTerminal,
    },
    {
        name: "Permissions",
        url: "/settings/permissions",
        icon: MdLockOutline,
    },
    {
        name: "Account Settings",
        url: "/settings/account",
        icon: MdSettings,
    },
];

const Sidebar: FC = () => {
    const pathname = usePathname();

    return (
        <aside className="h-[100%] mb-3">
            <div className={styles.items}>
                <div className="py-3 px-3">
                    <h1 className="text-2xl">Control Panel</h1>
                </div>

                {items.map((item, index) => (
                    <Fragment key={index}>
                        {index === items.length - 1 && (
                            <div className={styles.spacer}></div>
                        )}
                        <Link
                            href={item.url}
                            className={
                                styles.item +
                                (pathname === item.url
                                    ? ` ${styles.activeItem}`
                                    : "")
                            }
                        >
                            <item.icon />
                            <span>{item.name}</span>
                        </Link>
                    </Fragment>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
