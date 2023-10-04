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
import { Box, Chip, ListItemText, MenuItem, TextField } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC } from "react";

const DiscordCommandsCard: FC<SettingCardProps> = ({
    register,
    errors,
    data: { config, commands },
}) => {
    return (
        <Card>
            <CardHeader>
                <h4 className="font-bold text-large pl-2">Disabled Commands</h4>
            </CardHeader>

            <CardBody>
                <p className="pb-6">
                    These commands will be disabled in the current server, but
                    administrators can still use it.
                </p>

                <TextField
                    select
                    defaultValue={config?.disabled_commands?.guild ?? []}
                    SelectProps={{
                        multiple: true,
                        renderValue: selected => {
                            console.log("selected", selected);
                            return (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {(selected as string[]).map(value => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            );
                        },
                    }}
                    label="Commands"
                    {...register("disabled_commands.guild")}
                >
                    {(commands ?? []).map((cmd: string) => (
                        <MenuItem key={cmd} value={cmd} dense>
                            <ListItemText primary={cmd.replace("__", " ")} />
                        </MenuItem>
                    ))}
                </TextField>
            </CardBody>
        </Card>
    );
};

export default DiscordCommandsCard;
