"use client";

import { items } from "@/config/sidebar";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={twMerge(
                "h-full bg-white shadow-[0_0_1px_0_rgba(0,0,0,0.2)] dark:shadow-none dark:bg-[rgb(20,20,20)]",
                className,
            )}
        >
            <nav>
                <ul className="p-2">
                    {items.map((item) => (
                        <li key={`${item.href}_${item.title}`}>
                            <Link
                                href={item.href}
                                title={item.title}
                                className={clsx(
                                    "my-2.5 flex items-center space-x-4 rounded-lg p-4 text-sm text-gray-800 dark:text-gray-100",
                                    {
                                        "dark:bg-[rgb(40,40,40)] bg-gray-200": pathname === item.href,
                                        "dark:hover:bg-[rgb(35,35,35)] hover:bg-gray-100": pathname !== item.href,
                                    },
                                )}
                            >
                                <item.icon className="size-6" />
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
