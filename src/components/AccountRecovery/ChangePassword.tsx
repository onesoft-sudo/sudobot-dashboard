"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";

const ChangePassword: FC = () => {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();
    const onValid = (data: any) => {};

    return (
        <form
            className="mx-2 my-3 p-4 rounded-lg w-[calc(100vw-20px)] sm:w-[auto] md:min-w-[20vw]"
            onSubmit={handleSubmit(onValid)}
            style={{
                background:
                    "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
            }}
        ></form>
    );
};

export default ChangePassword;
