import { type FC } from "react";

type DialogControlsProps = {
    children: React.ReactNode;
};

const DialogControls: FC<DialogControlsProps> = ({ children }) => {
    return <div className="flex flex-col gap-2 pt-4">{children}</div>;
};

export default DialogControls;
