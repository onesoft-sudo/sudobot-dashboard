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

import useIsDesktop from "@/hooks/useIsDesktop";
import { LinearProgress } from "@mui/material";
import { FC, ReactNode } from "react";
import {
    FormState,
    UseFormGetValues,
    UseFormRegister,
    useForm,
} from "react-hook-form";
import FormLoading from "./FormLoading";

interface RecoverAccountFormProps {
    onValid?: (data: any) => any;
    step: number;
    currentStep: number;
    isMutating: boolean;
    defaultValues?: Record<string, any>;
    children: (params: {
        register: UseFormRegister<any>;
        formState: FormState<any>;
        getValues: UseFormGetValues<any>;
    }) => ReactNode;
}

const RecoverAccountForm: FC<RecoverAccountFormProps> = ({
    onValid = () => null,
    step,
    currentStep,
    isMutating,
    children,
    defaultValues = {},
}) => {
    const { handleSubmit, formState, register, getValues } = useForm({
        defaultValues,
    });
    const isDesktop = useIsDesktop();

    return (
        <form
            className="mx-2 rounded-lg w-[calc(100vw-20px)] md:min-w-[20vw] md:relative overflow-hidden"
            onSubmit={handleSubmit(onValid)}
            style={{
                background:
                    "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
                transform: isDesktop
                    ? `translate(calc(-${(currentStep - 1) * 100}% - (26px * ${
                          currentStep - 1
                      })))`
                    : `translate(calc(-${(currentStep - 1) * 100}vw - ${
                          currentStep - 1 == 0 ? "0px" : "8px"
                      } - ${currentStep > 2 ? (currentStep - 1) * 2 : 0}px))`,
                transition: "0.3s",
            }}
        >
            {isDesktop && (
                <div
                    className="absolute md:static top-0 left-0 w-[100%] h-[100%] md:h-[auto] md:rounded-t-[3px] overflow-hidden z-[1000]"
                    style={{
                        display: isMutating ? "block" : "none",
                    }}
                >
                    <LinearProgress />
                    <FormLoading isLoading={isMutating} />
                </div>
            )}

            <div className="p-4">
                {children({ formState, register, getValues })}
            </div>
        </form>
    );
};

export default RecoverAccountForm;
