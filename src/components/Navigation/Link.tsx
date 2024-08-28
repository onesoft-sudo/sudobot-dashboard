"use client";

import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { setLoading } from "@/redux/slice/NavigationSlice";
import clsx from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, forwardRef, useCallback, type FC } from "react";

type LinkProps = ComponentProps<typeof NextLink> & {
    defaultStyles?: boolean;
    alwaysUseRootDomain?: boolean;
};

const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;

const Link: FC<LinkProps> = (
    {
        className,
        defaultStyles = false,
        onClick,
        onKeyUp,
        children,
        href,
        alwaysUseRootDomain = true,
        ...props
    },
    ref,
) => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    const navigate = useCallback(() => {
        if (pathname !== href) {
            dispatch(setLoading(true));
            return;
        }

        if (!URL.canParse(href)) {
            return;
        }

        const targetHostname = new URL(href).hostname;

        if (targetHostname !== window.location.hostname) {
            dispatch(setLoading(true));
        }
    }, [pathname]);

    return (
        <NextLink
            href={
                !alwaysUseRootDomain || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("ftp://") || href.startsWith("mailto:")
                    ? href
                    :`${FRONTEND_DOMAIN?.startsWith("localhost") ? "http://" : "https://"}${FRONTEND_DOMAIN}${href}`
            }
            ref={ref}
            className={clsx(
                {
                    "text-blue-500 hover:underline hover:text-blue-700":
                        defaultStyles,
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
