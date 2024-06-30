import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type DialogIconProps = {
    type?: "icon" | "image";
    children: React.ReactNode;
    className?: string;
};

const DialogIcon: FC<DialogIconProps> = ({ type = "icon", children, className }) => {
    return (
        <div className="mb-10 mt-4 flex items-center justify-center">
            {type === "icon" ? (
                <div className={twMerge("flex size-20 items-center justify-center rounded-full text-5xl", className)}>
                    {children}
                </div>
            ) : (
                <div
                    className={twMerge(
                        "flex size-20 items-center justify-center rounded-lg bg-[#f0f0f0] dark:bg-[#333]",
                        className,
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default DialogIcon;
