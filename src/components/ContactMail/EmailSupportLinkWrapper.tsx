"use client";

import { LinkInfo } from "@/config/links";
import { type FC } from "react";
import ContactMail from "./ContactMail";
import ContactMailProvider from "./ContactMailProvider";
import ContactMailTrigger from "./ContactMailTrigger";

type EmailSupportLinkWrapperProps = {
    link: LinkInfo;
};

const EmailSupportLinkWrapper: FC<EmailSupportLinkWrapperProps> = ({
    link,
}) => {
    return (
        <div className="relative overflow-visible">
            <ContactMailProvider>
                <ContactMailTrigger as="span">
                    {link.title}
                </ContactMailTrigger>
                <ContactMail direction="bottom" />
            </ContactMailProvider>
        </div>
    );
};

export default EmailSupportLinkWrapper;
