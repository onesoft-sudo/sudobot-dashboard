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

import { Metadata } from "next";
import { FC } from "react";
import { MdError } from "react-icons/md";
import ErrorButtons from "./error-buttons";

export const metadata: Metadata = {
    title: "500 Internal Server Error - SudoBot",
    description: "Whoops! Looks like something is broken on our end.",
};

const InternalServerErrorPage: FC = () => {
    return (
        <main className="py-10 px-2 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-red-500 flex justify-center items-center gap-4">
                <MdError className="text-[1.2em] -mt-1" />
                500 Internal Server Error
            </h1>
            <br />
            <h3 className="text-xl md:text-2xl lg:text-3xl">
                Something went wrong
            </h3>
            <br />
            <p>
                The server encountered an internal error or misconfiguration and
                was unable to complete your request.
                <br /> Please contact the server administrator, at{" "}
                <a className="link" href="mailto:webmaster@sudobot.org">
                    webmaster@sudobot.org
                </a>{" "}
                to inform them of the time the error occurred, and anything you
                might have done that may have caused the error.
            </p>
            <br />
            <ErrorButtons />
        </main>
    );
};

export default InternalServerErrorPage;
