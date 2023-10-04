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

import { API } from "@/utils/api";
import axios from "axios";

export function updateUser({
    token,
    username,
    name,
    id,
    password,
}: {
    id: number | string;
    token: string;
    username?: string;
    name?: string | null;
    password?: string;
}) {
    return axios.patch(
        API.user(id.toString()),
        { username, name, password },
        {
            headers: {
                Authorization: `Bearer ${encodeURIComponent(token)}`,
            },
        }
    );
}
