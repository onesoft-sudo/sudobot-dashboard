"use client";

import { useRouterContext } from "@/contexts/RouterContext";
import NextLink from "next/link";
import {
    Component,
    ComponentProps,
    FC,
    ForwardRefExoticComponent,
    PropsWithChildren,
    ReactNode,
    Ref,
    forwardRef,
} from "react";

type AnyElement =
    | FC
    | ForwardRefExoticComponent<any>
    | { new (props: any): Component<any> }
    | ((props: any, context?: any) => ReactNode)
    | keyof JSX.IntrinsicElements;

type LinkProps<T extends AnyElement> = PropsWithChildren &
    ComponentProps<T> & {
        as?: T;
        href: string;
    };

function Link<T extends AnyElement = typeof NextLink>(
    { children, as = NextLink, onClick, href, ...props }: LinkProps<T>,
    ref?: Ref<any>
) {
    const router = useRouterContext();
    const Root = as;

    return (
        <Root
            href={href}
            ref={ref}
            onClick={(...args: any[]) => {
                if (
                    !href.startsWith("http://") &&
                    !href.startsWith("https://")
                ) {
                    router?.emit("loadStart");
                }

                return onClick?.(...args);
            }}
            {...props}
        >
            {children}
        </Root>
    );
}

export default forwardRef(Link);
