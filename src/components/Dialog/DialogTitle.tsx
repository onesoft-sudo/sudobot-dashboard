import { FC } from "react";

type DialogTitleProps = {
    children: React.ReactNode;
    as?: FC | keyof JSX.IntrinsicElements;
};

const DialogTitle: FC<DialogTitleProps> = ({ children, as: Element = "div" }) => {
    return <Element className="text-lg font-semibold">{children}</Element>;
};

export default DialogTitle;
