"use client";

import { useRouterContext } from "@/contexts/RouterContext";
import { Progress } from "@nextui-org/react";
import { FC } from "react";

const PageLoadingProgress: FC = () => {
    const router = useRouterContext();

    if (!router?.loading) {
        return <></>;
    }

    return (
        <div className="fixed top-0 left-0 z-[100000] w-[100vw]">
            <Progress size="sm" isIndeterminate />
        </div>
    );
};

export default PageLoadingProgress;
