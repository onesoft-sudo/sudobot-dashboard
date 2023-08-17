"use client";

import { FC, useRef, useState } from "react";

interface AvatarProps {
    url: string;
    animated?: boolean;
}

const Avatar: FC<AvatarProps> = ({ url, animated }) => {
    const ref = useRef<HTMLImageElement>(null);
    const [urlState, setURLState] = useState(url);

    return (
        <img
            ref={ref}
            src={urlState}
            alt="Avatar"
            className="rounded-full w-[40px] md:w-[50px] max-w-[110px]"
            {...(animated
                ? {
                      onMouseEnter: () => {
                          console.log("enter");
                          setURLState(s => s.replace(/\.webp$/, ".gif"));
                      },
                      onMouseLeave: () => {
                          console.log("leave");
                          setURLState(s => s.replace(/\.gif$/, ".webp"));
                      },
                  }
                : {})}
        />
    );
};

export default Avatar;
