"use client";

import { usePathname, useRouter } from "next/navigation";
import { type FC } from "react";
import BrandLogo from "./BrandLogo";

const Brand: FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => (pathname !== "/" ? router.push("/") : undefined)}
        >
            <BrandLogo />
            <span className="text-xl font-medium bg-gradient-to-tr from-[#999] to-[#000] bg-clip-text text-transparent dark:text-white">
                SudoBot
            </span>
        </div>
    );
};

export default Brand;
