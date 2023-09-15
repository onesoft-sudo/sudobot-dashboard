"use client";

import { updateUser } from "@/api/users";
import Loading from "@/components/Loading/Loading";
import Link from "@/components/Router/Link";
import { AuthContextAction, useAuthContext } from "@/contexts/AuthContext";
import useIsMobile from "@/hooks/useIsMobile";
import { IconButton, Snackbar } from "@mui/material";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { MdClose, MdRestore, MdSave } from "react-icons/md";

const AccountPage: FC = () => {
    const isMobile = useIsMobile();
    const { user, dispatch } = useAuthContext();
    const {
        formState: { errors },
        register,
        handleSubmit,
        reset,
    } = useForm();
    const mutation = useMutation<any, any, any>({
        mutationFn: async vars => {
            const result = await updateUser({
                ...vars,
                id: user?.id ?? 0,
                token: user?.token ?? "",
            });

            dispatch?.({
                type: AuthContextAction.SetUser,
                payload: { user: vars },
            });

            return result;
        },
        onError: () =>
            console.log(
                "Error occurred while trying to update user information"
            ),
    });

    if (!user) {
        return (
            <div className="p-5">
                <Loading />
            </div>
        );
    }

    const onValid = (data: any) => {
        console.log("Submit", data);
        mutation.mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onValid)}
            className="pt-5 grid grid-cols-1 px-2"
        >
            <Snackbar
                open={mutation.isSuccess}
                autoHideDuration={4000}
                onClose={mutation.reset}
                message="Successfully saved your changes"
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={mutation.reset}
                    >
                        <MdClose size={20} />
                    </IconButton>
                }
            />
            <div className="flex flex-col pt-5 md:pt-0 md:flex-row justify-center md:justify-end items-center md:px-5 gap-4 order-last md:order-first">
                <Button
                    variant="flat"
                    color="primary"
                    startContent={<MdSave />}
                    fullWidth={isMobile}
                    type="submit"
                    isLoading={mutation.isLoading}
                >
                    Save Changes
                </Button>
                <Button
                    variant="flat"
                    color="danger"
                    startContent={<MdRestore />}
                    fullWidth={isMobile}
                    type="reset"
                    isDisabled={mutation.isLoading}
                    onClick={() => {
                        reset();
                    }}
                >
                    Reset
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card>
                    <CardHeader>
                        <h2 className="text-xl md:text-2xl">
                            Account Information
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <Input
                            label="Your Name"
                            variant="flat"
                            fullWidth
                            defaultValue={user.name ?? ""}
                            {...register("name")}
                        />
                        <div className="pt-3"></div>
                        <Input
                            label="Username"
                            variant="flat"
                            fullWidth
                            defaultValue={user.username}
                            {...register("username", {
                                required: "You must specify a username!",
                            })}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500">
                                {errors.username.message?.toString()}
                            </p>
                        )}
                        <div className="pt-3"></div>
                        <Input
                            label="Discord ID"
                            variant="faded"
                            fullWidth
                            defaultValue={user.discordId}
                            isReadOnly
                        />
                        <p className="text-xs text-[#999] pt-1">
                            Currently your Discord ID can&rsquo;t be changed.
                            Contact the{" "}
                            <a
                                className="link"
                                href="mailto:rakinar2@onesoftnet.eu.org"
                            >
                                system admins
                            </a>{" "}
                            if you&rsquo;d like to change your connected Discord
                            Account.
                        </p>

                        <div className="pt-5">
                            <p className="text-[#999] block">
                                Account Created:{" "}
                                {formatDistanceToNowStrict(
                                    new Date(user.createdAt),
                                    { addSuffix: true }
                                )}
                            </p>

                            <p className="text-[#fff] block text-xs">
                                Want to change your password?{" "}
                                <Link
                                    href="/dashboard/account/recovery"
                                    className="link"
                                >
                                    Click here
                                </Link>
                                .
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </form>
    );
};

export default AccountPage;
