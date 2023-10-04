/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

"use client";

import { useRouterContext } from "@/contexts/RouterContext";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const Root = as;

    return (
        <Root
            href={href}
            ref={ref}
            onClick={(...args: any[]) => {
                if (
                    !href.startsWith("http://") &&
                    !href.startsWith("https://") &&
                    href !== pathname
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
