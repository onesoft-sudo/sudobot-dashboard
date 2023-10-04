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

import { BOT_INVITE_REQUEST_URL, DOCS_SELF_SETUP_URL } from "@/utils/links";
import { Button } from "@nextui-org/react";
import { FC } from "react";

const HomeButtons: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Button
                as={"a"}
                size="lg"
                style={{ minHeight: 60 }}
                radius="sm"
                variant="flat"
                color="primary"
                href={BOT_INVITE_REQUEST_URL}
                target="_blank"
            >
                Invite
            </Button>

            <Button
                as={"a"}
                size="lg"
                style={{ minHeight: 60 }}
                radius="sm"
                variant="flat"
                color="primary"
                href={DOCS_SELF_SETUP_URL}
                target="_blank"
            >
                Set up yourself
            </Button>
        </div>
    );
};

export default HomeButtons;
