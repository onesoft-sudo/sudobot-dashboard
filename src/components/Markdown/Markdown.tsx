import { ComponentProps, FC, PropsWithChildren } from "react";
import styles from "../../styles/Markdown.module.css";

const Markdown: FC<PropsWithChildren & ComponentProps<"div">> = ({
    children,
    ...props
}) => {
    return (
        <div {...props} className={`${styles.root} ${props.className}`}>
            {children}
        </div>
    );
};

export default Markdown;
