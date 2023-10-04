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
import { headers } from "next/headers";
import { FC } from "react";
import NotFoundInner from "./not-found-inner";

export const metadata: Metadata = {
    title: "404 Not Found - SudoBot",
    description: "Whoops! Could not find the page you were looking for.",
};

const NotFoundPage: FC = () => {
    return <NotFoundInner path={headers().get("x-invoke-path") ?? "/"} />;
};

export default NotFoundPage;
