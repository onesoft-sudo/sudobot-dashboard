import { FC } from "react";
import { ChildLink } from "@/components/Navigation/NavbarItem";
import Link from "next/link";

type Props = {
    item: ChildLink;
};

const ExpandedMenuItem: FC<Props> = ({ item }) => {
    return (
        <Link
            href={item.url}
            className="px-3 py-2 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 block"
        >
            <div>
                <div className="flex items-center gap-2">
                    {item.icon && <item.icon size="1.2rem" />}
                    <span className="md:text-lg lg:text-xl">{item.name}</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">{item.description}</p>
            </div>
        </Link>
    );
};

export default ExpandedMenuItem;
