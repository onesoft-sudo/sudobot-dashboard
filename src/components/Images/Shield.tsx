import Image from "next/image";
import { ComponentProps, FC } from "react";
import shieldImage from "../../images/sudobot-shield.png";

export const ShieldStyles = {
    width: "80%",
    height: "auto",
    background:
        "linear-gradient(rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.2))",
    borderRadius: "20px",
};

const Shield: FC<Partial<ComponentProps<typeof Image>>> = props => {
    return (
        <Image
            src={shieldImage.src}
            alt="Banner"
            width={0}
            height={0}
            sizes="80vw"
            {...props}
            style={{
                ...ShieldStyles,
                ...props.style,
            }}
        />
    );
};

export default Shield;
