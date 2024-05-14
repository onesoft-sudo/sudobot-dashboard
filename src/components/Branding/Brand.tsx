"use client";

import { useRouter } from "@/hooks/router";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";
import BrandLogo from "./BrandLogo";

type BrandProps = {
    classNames?: {
        image?: string;
        text?: string;
    };
};

const Brand: FC<BrandProps> = ({ classNames }) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => (pathname !== "/" ? router.push("/") : undefined)}
        >
            <BrandLogo className={classNames?.image} />
            <span
                className={twMerge(
                    "bg-gradient-to-tr from-[#999] to-[#000] bg-clip-text text-lg font-medium text-transparent dark:text-white lg:text-xl",
                    classNames?.text,
                )}
            >
                SudoBot
            </span>
        </div>
    );
};

export default Brand;
