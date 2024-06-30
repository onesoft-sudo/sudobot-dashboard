import { FC } from "react";

type DialogDescriptionProps = {
    children: React.ReactNode;
    as?: FC | keyof JSX.IntrinsicElements;
};

const DialogDescription: FC<DialogDescriptionProps> = ({ children, as: Element = "p" }) => {
    return <Element className="my-2 text-sm text-[#111] dark:text-[#ddd]">{children}</Element>;
};

export default DialogDescription;
