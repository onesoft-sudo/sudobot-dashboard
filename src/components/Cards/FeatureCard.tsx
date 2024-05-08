import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FeatureCardProps = {
    className?: string;
    children: ReactNode;
};

const FeatureCard: FC<FeatureCardProps> = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                "bg-gradient-to-tr from-[rgba(0,123,255,0.1)] to-[rgba(0,123,255,0.2)] rounded shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_1px_1px_rgba(0,123,255,0.3)] focus:outline focus:outline-2 focus:outline-blue-600 hover:outline hover:outline-2 hover:outline-gray-300 dark:hover:outline-gray-800",
                className
            )}
            tabIndex={-1}
        >
            {children}
        </div>
    );
};

export default FeatureCard;
