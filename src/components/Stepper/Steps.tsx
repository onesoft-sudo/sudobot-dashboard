"use client";

import { PropsWithChildren, forwardRef } from "react";

const Steps = forwardRef<HTMLDivElement, PropsWithChildren>(
    ({ children }, ref) => {
        return (
            <div ref={ref} className="keen-slider rounded-[10px]">
                {children}
            </div>
        );
    }
);

export default Steps;
