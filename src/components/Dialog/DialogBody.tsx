import { FC } from "react";

type DialogBodyProps = {
    children: React.ReactNode;
};

const DialogBody: FC<DialogBodyProps> = ({ children }) => {
    return <div className="text-center">{children}</div>;
};

export default DialogBody;
