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

import { Button } from "@mui/material";
import { FC } from "react";
import { MdError } from "react-icons/md";

interface InvalidProps {
    url?: string | string[];
    error?: boolean;
}

const Invalid: FC<InvalidProps> = ({ url, error }) => {
    return (
        <main className="flex justify-center items-center flex-col my-5 gap-3 text-red-600">
            <MdError size={40} />
            <div className="text-center text-2xl md:text-3xl">
                {!error ? (
                    <>{url ? "Invalid" : "No"} URL specified!</>
                ) : (
                    "An internal error has occurred."
                )}
            </div>

            <br />

            <div>
                <Button href="/" className="normal-case">
                    Return to Home
                </Button>
            </div>
        </main>
    );
};

export default Invalid;
