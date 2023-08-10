import { SettingCardProps } from "@/types/SetttingCardProps";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { FC } from "react";

const PrefixCard: FC<SettingCardProps> = ({ register, errors }) => {
    return (
        <Card>
            <CardHeader>
                <h4 className="font-bold text-large">Prefix</h4>
            </CardHeader>

            <CardBody>
                <Input
                    {...register("prefix", {
                        required: {
                            message: "Please enter a valid prefix!",
                            value: true,
                        },
                        value: "-",
                    })}
                    description={
                        errors.prefix ? (
                            <p className="text-red-600">
                                {errors.prefix.message?.toString() ?? ""}
                            </p>
                        ) : undefined
                    }
                />
            </CardBody>
        </Card>
    );
};

export default PrefixCard;
