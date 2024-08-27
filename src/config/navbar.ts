import {
    DOCS_URL,
    INVITE_REQUEST_URL,
    SUPPORT_EMAIL_ADDRESS,
} from "@/constants/links";

export const links = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Commands",
        href: DOCS_URL,
    },
    {
        title: "Support",
        href: `mailto:${SUPPORT_EMAIL_ADDRESS}`,
    },
    {
        title: "Invite",
        href: INVITE_REQUEST_URL,
        mobileOnly: false,
    },
];
