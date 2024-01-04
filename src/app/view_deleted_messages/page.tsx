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

import { APIDeletedMessage } from "@/types/APIMessage";
import axios, { AxiosResponse } from "axios";
import { ComponentProps, FC } from "react";
// import Messages from "./Messages";
// import Invalid from "./invalid";

const ViewDeletedMessages: FC<{
    searchParams?: { [key: string]: string | string[] | undefined };
}> = async ({ searchParams }) => {
    let invalidProps: any = {
        url: undefined,
        error: undefined,
    };

    let response:
        | AxiosResponse<{
              messages: APIDeletedMessage[];
              guild: {
                  id: string;
                  name: string;
                  iconURL?: string;
              };
              channel: {
                  id: string;
                  name: string;
                  type: number;
              };
              version: string;
              generatedAt: string;
          }>
        | undefined = undefined;

    if (
        !searchParams?.url ||
        typeof searchParams?.url !== "string" ||
        !searchParams?.url.startsWith("https://cdn.discordapp.com")
    ) {
        invalidProps.url = searchParams?.url;
    } else {
        try {
            console.log("searchParams.url", searchParams.url);

            response = await axios.get(searchParams?.url, {
                headers: {
                    Accept: "application/json",
                },
            });
        } catch (e) {
            invalidProps.error = true;
        }
    }

    console.log("searchParams", searchParams);

    return (
        <main className="min-h-[90vh] py-4 px-0 lg:px-[17.3%]">
            LMAO
        </main>
    );
};

export default ViewDeletedMessages;
