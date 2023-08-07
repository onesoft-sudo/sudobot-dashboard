import { ComponentProps, FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import { MdCheck, MdError, MdInfo, MdWarning } from "react-icons/md";

interface AlertProps extends PropsWithChildren, ComponentProps<"div"> {
    type?: "info" | "success" | "error" | "warning";
    icon?: IconType;
    className?: string;
}

const Alert: FC<AlertProps> = ({
    children,
    icon,
    type = "success",
    className = "",
    ...props
}) => {
    const Icon =
        icon ??
        (type === "success"
            ? MdCheck
            : type === "error"
            ? MdError
            : type === "info"
            ? MdInfo
            : type === "warning"
            ? MdWarning
            : MdCheck);

    const colorClass =
        type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-600"
            : type === "info"
            ? "bg-blue-600"
            : type === "warning"
            ? "bg-yellow-600"
            : "bg-green-500";

    return (
        <div
            className={`${colorClass} flex gap-5 items-center p-3 rounded-md mb-4 ${className}`}
            {...props}
        >
            <Icon size={20} />
            <p>{children}</p>
        </div>
    );
};

export default Alert;
