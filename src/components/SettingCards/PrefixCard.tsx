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

import { SettingCardProps } from "@/types/SetttingCardProps";
import { FormHelperText, TextField } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC } from "react";

const PrefixCard: FC<SettingCardProps> = ({ register, errors }) => {
    return (
        <Card>
            <CardHeader>
                <h4 className="font-bold text-large pl-2">Prefix</h4>
            </CardHeader>

            <CardBody>
                <p className="pb-6">
                    You can always use the slash commands or tag the bot to run
                    a command.
                </p>

                <TextField
                    label="Prefix"
                    {...register("prefix", {
                        required: {
                            message: "Please enter a valid prefix!",
                            value: true,
                        },
                        value: "-",
                    })}
                />
                {errors.prefix ? (
                    <FormHelperText>
                        <span className="text-red-600">
                            {errors.prefix.message?.toString() ?? ""}
                        </span>
                    </FormHelperText>
                ) : undefined}
            </CardBody>
        </Card>
    );
};

export default PrefixCard;
