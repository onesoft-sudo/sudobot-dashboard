import { ComponentProps } from "react";

const Card = ({
    children,
    className = "",
    ...props
}: ComponentProps<"div">) => {
    return (
        <div
            {...props}
            className={`md:mx-0 max-w-[90vw] w-[90vw] md:w-[40vw] lg:w-[25vw] xl:w-[17vw] shadow-[0_0_2px_0_rgba(255,255,255,0.5)] rounded-[10px] ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
