import logo from "@/images/sudobot-shield.png";
import Image from "next/image";
import { ComponentProps, type FC } from "react";
import { twMerge } from "tailwind-merge";

type BrandLogoProps = Partial<Omit<ComponentProps<typeof Image>, "src">>;

const BrandLogo: FC<BrandLogoProps> = ({ style, className, ...props }) => {
    return (
        <Image
            alt="Logo"
            src={logo}
            height={40}
            width={40}
            placeholder="blur"
            style={{
                cursor: "pointer",
                borderRadius: "10px",
                ...style,
            }}
            className={twMerge(
                "bg-[linear-gradient(145deg,rgba(0,0,0,0.1),rgba(0,0,0,0.05))] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.12))]",
                className,
            )}
            {...props}
        />
    );
};

export default BrandLogo;
