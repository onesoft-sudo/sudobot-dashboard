import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function CenterContents({ children, className, ...props }: ComponentProps<"div">) {
    return (
        <div className={twMerge("flex h-full flex-col items-center justify-center", className)} {...props}>
            {children}
        </div>
    );
}
