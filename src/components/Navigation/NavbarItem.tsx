"use client";

import { FC, useState } from "react";
import styles from "@/styles/NavbarItem.module.css";
import Link from "next/link";
import { MdExpandMore } from "react-icons/md";
import ExpandableMenu from "@/components/Navigation/ExpandableMenu";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

type LinkInfo = {
    name: string;
} & (
    | {
          url: string;
      }
    | {
          children: Array<ChildLink>;
      }
);

export type ChildLink = {
    name: string;
    description?: string;
    url: string;
    icon?: IconType;
};

type Props = {
    link: LinkInfo;
};

const NavbarItem: FC<Props> = ({ link }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname()

    return (
        <li className={styles.link}>
            {"url" in link ? (
                <Link href={link.url} title={link.name} className={styles.linkAnchor} data-active={(pathname === link.url).toString()}>
                    {link.name}
                </Link>
            ) : (
                <div
                    tabIndex={0}
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => setIsExpanded(false)}
                    className={`${styles.linkAnchor} ${styles.linkAnchorExpandable}`}
                >
                    <span>{link.name}</span>
                    <MdExpandMore className={styles.icon} />
                    <ExpandableMenu isExpanded={isExpanded} links={link.children} />
                </div>
            )}
        </li>
    );
};

export default NavbarItem;
