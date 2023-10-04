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

import { FC, useRef, useState } from "react";

interface AvatarProps {
    url: string;
    animated?: boolean;
}

const Avatar: FC<AvatarProps> = ({ url, animated }) => {
    const ref = useRef<HTMLImageElement>(null);
    const [urlState, setURLState] = useState(url);

    return (
        <img
            ref={ref}
            src={urlState}
            alt="Avatar"
            className="rounded-full w-[40px] md:w-[50px] max-w-[110px]"
            {...(animated
                ? {
                      onMouseEnter: () => {
                          console.log("enter");
                          setURLState(s => s.replace(/\.webp$/, ".gif"));
                      },
                      onMouseLeave: () => {
                          console.log("leave");
                          setURLState(s => s.replace(/\.gif$/, ".webp"));
                      },
                  }
                : {})}
        />
    );
};

export default Avatar;
