import { ToastDetails } from "@/redux/slice/ToastManagerSlice";
import { Button, LinearProgress } from "@mui/material";
import { ReactNode, type FC } from "react";
import { MdClose, MdError, MdInfo, MdSecurity, MdSource, MdWarning } from "react-icons/md";
import FormattedDistance from "../DateTime/FormattedDistance";

type ToastProps = {
    details: ToastDetails;
    onClose: () => void;
};

const iconResolver = (icon: string): ReactNode => {
    switch (icon) {
        case "MdSecurity":
            return <MdSecurity size="1rem" />;
        case "MdError":
            return <MdError size="1rem" />;
        case "MdWarning":
            return <MdWarning size="1rem" />;
        case "MdInfo":
            return <MdInfo size="1rem" />;
        case "MdSource":
            return <MdSource size="1rem" />;
        default:
            return <MdInfo size="1rem" />;
    }
};

const Toast: FC<ToastProps> = ({ details, onClose }) => {
    return (
        <div className="w-full rounded-md bg-white text-sm shadow-md dark:bg-[rgb(35,35,35)] dark:shadow-none">
            <div className="py-2 pl-4 pr-3">
                <div className="flex items-center justify-between">
                    <div className="mb-2 flex items-center gap-1.5">
                        {details.icon && <span>{iconResolver(details.icon)}</span>}
                        <span className="font-semibold">{details.title ?? "Default"}</span>
                        {details.createdAt && (
                            <>
                                {" "}
                                &bull;{" "}
                                <span className="text-[#999]">
                                    <FormattedDistance compare={details.createdAt} />
                                </span>
                            </>
                        )}
                    </div>
                    <Button sx={{ minWidth: 0 }} className="text-black dark:text-white" centerRipple onClick={onClose}>
                        <MdClose />
                    </Button>
                </div>
                <p className="text-neutral-800 dark:text-neutral-300">{details.contents}</p>
            </div>
            {details.progress && <LinearProgress className="mt-1 rounded-b-md" />}
        </div>
    );
};

export default Toast;
