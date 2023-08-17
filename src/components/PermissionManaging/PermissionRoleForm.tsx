import { APIPermissionRole } from "@/types/APIPermissionRole";
import { FormHelperText, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Switch from "../Common/Switch";

interface PermissionRoleFormProps {
    permission: APIPermissionRole;
}

const PermissionRoleForm: FC<PermissionRoleFormProps> = ({ permission }) => {
    const [formData, setFormData] = useState({
        levelBased: permission.level !== undefined,
    });
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm();

    const onValid = (data: any) => {
        console.log(data);
    };

    return (
        <form noValidate className="pt-3" onSubmit={handleSubmit(onValid)}>
            <div className="flex justify-between items-center overflow-x-hidden">
                <h5 className="font-semibold">Level-based permissions</h5>
                <div className="-mr-2">
                    <Switch
                        defaultChecked={permission.level !== undefined}
                        {...register("levelBased", {
                            onChange: e =>
                                setFormData(state => ({
                                    ...state,
                                    levelBased: e.target.checked,
                                })),
                        })}
                    />
                </div>
            </div>

            <p className="text-[#999] mt-2 text-sm">
                Enables level based permission mode on this permission role. You
                can specify levels from 0 to 100 to indicate a permission grade.
            </p>

            {formData.levelBased && (
                <>
                    <br />

                    <TextField
                        type="number"
                        label="Permission Level"
                        fullWidth
                        defaultValue={permission.level ?? 0}
                        {...register("level", {
                            min: {
                                value: 0,
                                message: "The lowest level is 0!",
                            },
                            max: {
                                value: 100,
                                message: "The highest level is 100!",
                            },
                            valueAsNumber: true,
                        })}
                    />

                    {errors.level && (
                        <FormHelperText className="text-red-500">
                            {errors.level.message?.toString()}
                        </FormHelperText>
                    )}
                </>
            )}
        </form>
    );
};

export default PermissionRoleForm;
