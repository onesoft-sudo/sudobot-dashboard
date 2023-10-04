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

import { createReview } from "@/api/reviews";
import {
    Alert,
    Box,
    Dialog,
    FormHelperText,
    Button as MUIButton,
    Slider,
    Stack,
} from "@mui/material";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdCheck, MdClose, MdPerson, MdStar } from "react-icons/md";

const ReviewCreateForm: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm<any>({
        defaultValues: {
            name: undefined,
            rating: 3,
        },
    });
    const ref = useRef<HTMLInputElement>(null);
    const [rating, setRating] = useState(0);
    const mutation = useMutation<any, any>({
        onSuccess(data, variables, context) {
            console.log(data);
            setIsOpen(false);
            setDialogOpen(true);
        },
        mutationFn: createReview,
    });

    const onValid = (data: any) => {
        mutation.mutate({ ...data, rating });
    };

    return (
        <div>
            <MUIButton startIcon={<MdAdd />} onClick={() => setIsOpen(true)}>
                Add Your Review
            </MUIButton>

            <Dialog open={isDialogOpen}>
                <Box sx={{ p: 1 }}>
                    <div className="p-2">
                        <h1 className="text-xl lg:text-2xl pb-3">
                            Review Added
                        </h1>
                        <p className="text-[#999]">
                            Your review has been added successfully. To prevent
                            spam, one of our system administrators need to
                            approve your review, in order to make it show up in
                            this page.
                        </p>
                    </div>

                    <div className="pt-3 flex justify-end items-center">
                        <MUIButton onClick={() => setDialogOpen(false)}>
                            OK
                        </MUIButton>
                    </div>
                </Box>
            </Dialog>

            <form onSubmit={handleSubmit(onValid)}>
                <input type="submit" className="hidden" ref={ref} />
                <Modal
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    placement="top-center"
                >
                    <ModalContent>
                        {onClose => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Add Review
                                </ModalHeader>
                                <ModalBody>
                                    {mutation.isError &&
                                        mutation.error &&
                                        mutation.error.response.status ===
                                            429 && (
                                            <Alert severity="error">
                                                You&rsquo;ve already submitted a
                                                review.
                                            </Alert>
                                        )}
                                    <div>
                                        <Input
                                            autoFocus
                                            endContent={
                                                <MdPerson className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                            label="Name"
                                            placeholder="Enter your name"
                                            variant="bordered"
                                            {...register("name", {
                                                setValueAs(value) {
                                                    return !value ||
                                                        value?.trim() === ""
                                                        ? undefined
                                                        : value;
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message:
                                                        "Name cannot have more than 30 characters!",
                                                },
                                            })}
                                        />
                                        <FormHelperText>
                                            <span className="text-[#999]">
                                                Leaving this field empty will
                                                make this review anonymous.
                                            </span>
                                        </FormHelperText>
                                        {errors.name?.message && (
                                            <FormHelperText>
                                                <span className="text-red-500">
                                                    {errors.name?.message.toString()}
                                                </span>
                                            </FormHelperText>
                                        )}
                                    </div>
                                    <div className="px-2">
                                        <label className="pb-2 block">
                                            Service Rating
                                        </label>
                                        <Stack
                                            spacing={2}
                                            direction="row"
                                            sx={{ mb: 1 }}
                                            alignItems="center"
                                        >
                                            <MdClose className="text-red-500 [border:1px_solid] border-red-500 rounded-lg p-1 w-[30px] h-[25px]" />
                                            <Slider
                                                aria-label="Volume"
                                                value={(rating / 5) * 100}
                                                step={20}
                                                defaultValue={60}
                                                {...(register("rating", {
                                                    onChange(event: any) {
                                                        const rating =
                                                            ((event.target
                                                                .value as number) /
                                                                100) *
                                                            5;

                                                        setRating(rating);
                                                    },
                                                }) as any)}
                                            />
                                            <MdCheck className="text-green-500 [border:1px_solid] border-green-500 rounded-lg p-1 w-[30px] h-[25px]" />
                                        </Stack>
                                        <div
                                            className="flex justify-center items-center py-4 gap-2"
                                            style={{
                                                color:
                                                    rating <= 1
                                                        ? "#f14a60"
                                                        : rating === 2
                                                        ? "#fff"
                                                        : rating === 3
                                                        ? "#ccbd5e"
                                                        : rating === 4
                                                        ? "#61c97d"
                                                        : "#32a852",
                                            }}
                                        >
                                            <MdStar size={30} />
                                            <h3 className="text-xl md:text-2xl">
                                                {rating}/5
                                            </h3>
                                        </div>
                                    </div>
                                    <div>
                                        <Textarea
                                            label="Your review"
                                            placeholder={
                                                rating <= 2
                                                    ? "Is there anything we can improve to make your experience better?"
                                                    : "Write your review..."
                                            }
                                            variant="bordered"
                                            {...register("content", {
                                                maxLength: {
                                                    value: 150,
                                                    message:
                                                        "Your review cannot have more than 150 characters!",
                                                },
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please describe your review!",
                                                },
                                            })}
                                        />
                                        {errors.content?.message && (
                                            <FormHelperText>
                                                <span className="text-red-500">
                                                    {errors.content?.message.toString()}
                                                </span>
                                            </FormHelperText>
                                        )}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        onPress={onClose}
                                        isDisabled={mutation.isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => {
                                            ref.current?.click();
                                        }}
                                        isLoading={mutation.isLoading}
                                    >
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </form>
        </div>
    );
};

export default ReviewCreateForm;
