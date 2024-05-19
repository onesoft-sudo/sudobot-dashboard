import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type AccordionProps = {
    children: ReactNode;
    className?: string;
};

const Accordion: FC<AccordionProps> = ({ children, className }) => {
    return <div className={twMerge("flex flex-col gap-2", className)}>{children}</div>;
};

export default Accordion;
