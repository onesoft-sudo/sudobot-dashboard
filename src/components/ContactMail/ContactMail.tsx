"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { type FC } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
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
        <Modal isOpen={isOpen} placement="auto" onOpenChange={context.setOpen}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex items-center">
                            <svg width="0" height="0">
                                <linearGradient
                                    id="mail-icon-gradient"
                                    x1="100%"
                                    y1="100%"
                                    x2="0%"
                                    y2="0%"
                                >
                                    <stop stopColor="#007bff" offset="0%" />
                                    <stop stopColor="#19dafa" offset="100%" />
                                </linearGradient>
                            </svg>
                            <HiOutlineEnvelope
                                style={{
                                    stroke: "url(#mail-icon-gradient)",
                                }}
                                size="1.5em"
                            />
                            <span className="bg-gradient-to-l from-blue-600 to-cyan-500 bg-clip-text text-transparent ml-2.5 block">
                                Contact Support
                            </span>
                        </ModalHeader>

                        <ModalBody>
                            <ContactMailForm onClose={onClose} />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ContactMail;
