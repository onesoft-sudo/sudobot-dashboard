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

import Image from "next/image";
import { ComponentProps, FC } from "react";
import shieldImage from "../../images/sudobot-shield.png";

export const ShieldStyles = {
    width: "80%",
    height: "auto",
    background:
        "linear-gradient(rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.2))",
    borderRadius: "20px",
};

const Shield: FC<Partial<ComponentProps<typeof Image>>> = props => {
    return (
        <Image
            src={shieldImage.src}
            alt="Banner"
            width={0}
            height={0}
            sizes="80vw"
            {...props}
            style={{
                ...ShieldStyles,
                ...props.style,
            }}
        />
    );
};

export default Shield;
