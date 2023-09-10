import { APIStatus } from "@/types/APIStatus";
import { ComponentProps, FC } from "react";
import {
    MdCancel,
    MdConstruction,
    MdOutlineErrorOutline,
    MdWarning,
    MdWarningAmber,
} from "react-icons/md";
import styles from "../../styles/StatusCardIcon.module.css";

interface StatusCardIconProps {
    status: APIStatus;
}

const iconProps: ComponentProps<typeof MdWarningAmber> = {
    size: 40,
};

const StatusCardIcon: FC<StatusCardIconProps> = ({ status }) => {
    switch (status) {
        case "operational":
            return <div className={`${styles.circle}`}></div>;

        case "major_outage":
            return (
                <MdOutlineErrorOutline
                    className="text-red-500"
                    {...iconProps}
                />
            );

        case "partial_outage":
            return <MdWarning className="text-red-400" {...iconProps} />;

        case "degraded":
            return <MdWarning className="text-orange-400" {...iconProps} />;

        case "maintenence":
            return <MdConstruction className="text-blue-500" {...iconProps} />;

        case "error":
            return <MdCancel className="text-red-500" {...iconProps} />;

        default:
            return <></>;
    }
};

export default StatusCardIcon;
