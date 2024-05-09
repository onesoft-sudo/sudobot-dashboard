"use client";

import { usePathname, useRouter } from "next/navigation";
import { type FC } from "react";
import BrandLogo from "./BrandLogo";

const Brand: FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => (pathname !== "/" ? router.push("/") : undefined)}
        >
            <BrandLogo />
            <span className="bg-gradient-to-tr from-[#999] to-[#000] bg-clip-text text-xl font-medium text-transparent dark:text-white">
                SudoBot
            </span>
        </div>
    );
};

export default Brand;
