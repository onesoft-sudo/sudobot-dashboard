"use client";

import { Box, Button, Divider } from "@mui/material";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { type FC } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import ContactMailForm from "./ContactMailForm";
import { useContactMail } from "./useContactMail";

type ContactMailProps = {
    isOpen?: boolean;
    direction?: "top" | "bottom";
};

const ContactMail: FC<ContactMailProps> = ({
    isOpen: propsIsOpen,
    direction = "top",
}) => {
    const context = useContactMail();
    const isOpen = propsIsOpen ?? context.isOpen;

    return (
        <>
            {isOpen && (
                <Box
                    className="fixed inset-0 bg-black/40 z-[9999] top-0 left-0 w-screen h-screen lg:hidden"
                    onClick={context.close}
                />
            )}
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        className={clsx(
                            "z-[10000] bg-white fixed max-lg:bottom-3 max-lg:left-3 lg:absolute dark:bg-neutral-900 shadow dark:shadow-neutral-400/40 w-[calc(100%-1.5rem)] lg:w-[30rem] rounded-lg mt-3",
                            {
                                "bottom-7": direction === "bottom",
                                "top-7": direction === "top",
                            },
                        )}
                        initial={{
                            opacity: 0,
                            y: (direction === "top" ? -1 : 1) * 10,
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: (direction === "top" ? -1 : 1) * 10,
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            pt={2}
                            px={2}
                        >
                            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent flex items-center gap-2">
                                <svg width="0" height="0">
                                    <linearGradient
                                        id="mail-icon-gradient"
                                        x1="100%"
                                        y1="100%"
                                        x2="0%"
                                        y2="0%"
                                    >
                                        <stop stopColor="#007bff" offset="0%" />
                                        <stop
                                            stopColor="#19dafa"
                                            offset="100%"
                                        />
                                    </linearGradient>
                                </svg>
                                <HiOutlineEnvelope
                                    style={{
                                        stroke: "url(#mail-icon-gradient)",
                                    }}
                                    size="1.5em"
                                />
                                <span>Contact Support</span>
                            </h3>
                            <Button
                                className="text-neutral-500 dark:text-neutral-400 min-w-0 bg-neutral-50 dark:bg-neutral-800"
                                onClick={context.close}
                            >
                                <MdClose />
                            </Button>
                        </Box>
                        <Divider className="mt-3" />
                        <div className="pb-2">
                            <ContactMailForm />
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
};

export default ContactMail;
