"use client";

import { LinkInfo } from "@/config/links";
import { type FC } from "react";
import ContactMail from "./ContactMail";
import ContactMailTrigger from "./ContactMailTrigger";

type EmailSupportLinkWrapperProps = {
    link: LinkInfo;
};

const EmailSupportLinkWrapper: FC<EmailSupportLinkWrapperProps> = ({
    link,
}) => {
    console.log(1);

    return (
        <div className="relative overflow-visible">
            <ContactMailTrigger as="a" href="#">
                {link.title}
            </ContactMailTrigger>
            <ContactMail />
        </div>
    );
};

export default EmailSupportLinkWrapper;
