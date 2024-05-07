import logo from "@/images/sudobot-shield.png";
import Image from "next/image";
import { ComponentProps, type FC } from "react";

type BrandLogoProps = Partial<Omit<ComponentProps<typeof Image>, "src">>;

const BrandLogo: FC<BrandLogoProps> = ({ style, ...props }) => {
    return (
        <Image
            alt="Logo"
            src={logo}
            height={50}
            width={50}
            style={{
                cursor: "pointer",
                borderRadius: "10px",
                ...style,
            }}
            className="bg-[linear-gradient(145deg,rgba(0,0,0,0.1),rgba(0,0,0,0.05))] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.12))]"
            {...props}
        />
    );
};

export default BrandLogo;
