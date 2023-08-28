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
