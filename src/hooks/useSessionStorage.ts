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

import { useEffect, useState } from "react";

export default function useSessionStorage(
    key: string,
    value?: string | (() => string)
): [
    string | null | undefined,
    (newValue: string) => void,
    (stateUpdate?: boolean) => void
] {
    const [state, setState] = useState<string | null | undefined>(undefined);

    useEffect(() => {
        try {
            setState(
                typeof value === "undefined"
                    ? sessionStorage.getItem(key)
                    : value instanceof Function && typeof value === "function"
                    ? value()
                    : value
            );
        } catch (e) {
            console.log(e);
            setState(null);
        }
    }, []);

    const updateStateAndSession = (newValue: string) => {
        try {
            sessionStorage.setItem(key, newValue);
            setState(newValue);
        } catch (e) {
            console.log(e);
        }
    };

    const removeStateAndSession = (stateUpdate?: boolean) => {
        try {
            sessionStorage.removeItem(key);

            if (stateUpdate) {
                setState(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return [state, updateStateAndSession, removeStateAndSession];
}
