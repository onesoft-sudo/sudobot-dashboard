"use client";

import { FC, ReactNode } from "react";

interface OverlayProgressProps {
    children?: ReactNode;
    isLoading?: boolean;
}

const OverlayProgress: FC<OverlayProgressProps> = ({
    children,
    isLoading = false,
}) => {
    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[rgba(255,255,255,0.4)]"></div>
            )}
            {children}
        </div>
    );
};

export default OverlayProgress;
