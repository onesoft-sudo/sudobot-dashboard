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

import { Metadata } from "next";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { MdError } from "react-icons/md";
import ErrorButtons from "./error-buttons";

export const metadata: Metadata = {
    title: "403 Forbidden - SudoBot",
    description: "Whoops! Looks like you've come into a wrong page.",
};

const ForbiddenPage: FC = () => {
    const pathname = usePathname();

    return (
        <main className="py-10 px-2 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-red-500 flex justify-center items-center gap-4">
                <MdError className="text-[1.2em] -mt-1" />
                403 Forbidden
            </h1>
            <br />
            <h3 className="text-xl md:text-2xl lg:text-3xl">Access Denied</h3>
            <br />
            <p>
                You don&rsquo;t have permission to access{" "}
                <span className="font-mono text-blue-500">{pathname} </span> on
                this server. Are you sure you&rsquo;re accessing the right URL?
                <br />
                If you think this should not happen, please contact the
                webmaster at{" "}
                <a className="link" href="mailto:webmaster@sudobot.org">
                    webmaster@sudobot.org
                </a>
                .
            </p>
            <br />
            <ErrorButtons />
        </main>
    );
};

export default ForbiddenPage;
