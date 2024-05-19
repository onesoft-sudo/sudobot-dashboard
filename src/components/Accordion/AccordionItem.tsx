"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode, useState, type FC } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

type AccordionItemProps = {
    title: ReactNode;
    children: ReactNode;
};

const AccordionItem: FC<AccordionItemProps> = ({ title, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="rounded-lg bg-white shadow dark:bg-[rgb(30,30,30)] dark:shadow-white/10">
            <div
                className="relative z-50 flex cursor-default items-center justify-between rounded-lg bg-transparent py-2 pl-4 pr-2 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-blue-600"
                onClick={() => setExpanded((s) => !s)}
                tabIndex={0}
            >
                <div className="font-normal">{title}</div>
                <div
                    className={clsx(
                        "cursor-pointer p-[0.2rem] text-[#999] transition duration-300 hover:text-black dark:hover:text-white",
                        {
                            "rotate-180": expanded,
                        },
                    )}
                >
                    <MdKeyboardArrowDown size="1.5rem" />
                </div>
            </div>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: expanded ? "auto" : 0,
                    opacity: expanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-b-lg bg-gray-100/80 !pt-0 dark:border-t dark:border-[#333] dark:dark:bg-[rgb(30,30,30)]"
            >
                <div className="p-4">{children}</div>
            </motion.div>
        </div>
    );
};

export default AccordionItem;
