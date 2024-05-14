"use client";

import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { setLoading } from "@/redux/slice/NavigationSlice";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, forwardRef, type FC } from "react";

type LinkProps = ComponentProps<typeof NextLink> & {
    defaultStyles?: boolean;
};

const Link: FC<LinkProps> = ({ className, defaultStyles = false, onClick, onKeyUp, children, href, ...props }, ref) => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const navigate = () => {
        if (pathname !== href) {
            dispatch(setLoading(true));
        }
    };

    return (
        <NextLink
            href={href}
            ref={ref}
            className={clsx(
                {
                    "text-blue-500 hover:underline hover:text-blue-700": defaultStyles,
                },
                className,
            )}
            onClick={(event) => {
                navigate();
                onClick?.(event);
            }}
            onKeyUp={(event) => {
                if (event.code === "Enter") {
                    navigate();
                }

                onKeyUp?.(event);
            }}
            {...props}
        >
            {children}
        </NextLink>
    );
};

export default forwardRef(Link as any) as FC<LinkProps>;
