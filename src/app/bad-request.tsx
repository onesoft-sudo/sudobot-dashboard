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
import Head from "next/head";
import { FC } from "react";
import { MdError } from "react-icons/md";
import ErrorButtons from "./error-buttons";

export const metadata: Metadata = {
    title: "400 Bad Request - SudoBot",
    description: "Whoops! Looks like you've done something wrong.",
};

const BadRequestPage: FC<{ description?: string }> = ({
    description = "Invalid Request Payload",
}) => {
    return (
        <main className="py-10 px-2 text-center">
            <Head>
                <title key="title">{metadata.title?.toString()}</title>
                <meta
                    name="description"
                    key="description"
                    content={metadata.description?.toString()}
                />
            </Head>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-red-500 flex justify-center items-center gap-4">
                <MdError className="text-[1.2em] -mt-1" />
                400 Bad Request
            </h1>
            <br />
            <h3 className="text-xl md:text-2xl lg:text-3xl">{description}</h3>
            <br />
            <p>
                Your browser sent a request that the server could not
                understand. Are you sure you&rsquo;re accessing the right URL?
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

export default BadRequestPage;
