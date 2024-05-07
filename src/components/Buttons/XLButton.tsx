import Link from "next/link";
import { ComponentProps, type FC } from "react";
import { twMerge } from "tailwind-merge";

type XLButtonProps = ComponentProps<"a"> & {
    href: string;
};

const XLButton: FC<XLButtonProps> = (props) => {
    return (
        <Link
            href={props.href}
            className={twMerge("text-lg lg:text-xl bg-[#007bff] rounded py-2 px-4 hover:bg-[#005fc4]", props.className)}
        >
            {props.children}
        </Link>
    );
};

export default XLButton;
