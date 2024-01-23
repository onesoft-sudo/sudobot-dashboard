import { FC } from 'react';
import { ChildLink } from "@/components/Navigation/NavbarItem";
import ExpandedMenuItem from "@/components/Navigation/ExpandedMenuItem";
import { twMerge } from "tailwind-merge";

type Props = {
    links: ChildLink[];
    isExpanded: boolean;
};

const ExpandableMenu: FC<Props> = ({ links, isExpanded }) => {
    return (
        <div className={twMerge("absolute left-0 top-8 z-[100] box-border w-max min-w-[100px] bg-zinc-100 dark:bg-zinc-900 shadow-[0_0_2px_0_#aaa] rounded grid grid-cols-3 gap-[1px] overflow-hidden max-w-[40vw] cursor-default [transition:0.5s]", isExpanded ? 'opacity-1' : 'opacity-0 z-[-100] overflow-hidden')} style={{
            maxHeight: isExpanded ? `${links.length * 5}rem` : 0
        }}>
            {links.map(link => (
                <ExpandedMenuItem key={link.name} item={link} />
            ))}
        </div>
    );
};

export default ExpandableMenu;