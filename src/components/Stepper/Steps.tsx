"use client";

import { PropsWithChildren, Ref, forwardRef } from "react";

const Steps = ({ children }: PropsWithChildren, ref: Ref<any>) => {
    return (
        <div ref={ref} className="keen-slider rounded-[10px]">
            {children}
        </div>
    );
};

export default forwardRef(Steps);
