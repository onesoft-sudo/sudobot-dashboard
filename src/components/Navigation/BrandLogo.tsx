"use client";

import Image from "next/image";
import logo from "@/images/logo.png";
import logoTransparent from "@/images/logo-transparent.png";
import { ComponentProps, FC } from "react";
import { usePrefersLightMode } from "@/hooks/useColorScheme";

const BrandLogo: FC<Partial<ComponentProps<typeof Image>>> = (props) => {
    const lightMode = usePrefersLightMode();

    return (
        <div
            style={
                lightMode
                    ? {
                          padding: 2,
                          borderRadius: 5,
                          background: "rgba(123, 123, 123, 0.2)",
                      }
                    : undefined
            }
        >
            <Image src={lightMode ? logoTransparent.src : logo.src} alt="Logo" height={35} width={35} {...props} />
        </div>
    );
};

export default BrandLogo;
