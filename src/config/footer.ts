import {
    DISCORD_SERVER_INVITE_URL,
    DOCS_URL,
    GITHUB_REPO_URL,
    INVITE_REQUEST_URL,
    PRIVACY_POLICY_URL,
    STATUS_PAGE_URL,
    SUPPORT_EMAIL_ADDRESS,
    TERMS_OF_SERVICE_URL,
} from "@/constants/links";
import { FaDiscord, FaEnvelope, FaGithub, FaGlobe } from "react-icons/fa6";

export const links = {
    support: {
        groupName: "Support",
        links: [
            {
                title: "Discord Server",
                url: DISCORD_SERVER_INVITE_URL,
                external: true,
            },
            {
                title: "Email Support",
                url: `mailto:${SUPPORT_EMAIL_ADDRESS}`,
            },
            {
                title: "GitHub",
                url: GITHUB_REPO_URL,
                external: true,
            },
        ],
    },
    resources: {
        groupName: "Resources",
        links: [
            {
                title: "Service Status",
                url: STATUS_PAGE_URL,
                external: true,
            },
            {
                title: "Request an Invite",
                url: INVITE_REQUEST_URL,
                external: true,
            },
            {
                title: "Documentation",
                url: DOCS_URL,
                external: true,
            },
        ],
    },
    legal: {
        groupName: "Legal",
        links: [
            {
                title: "Privacy Policy",
                url: PRIVACY_POLICY_URL,
                external: true,
            },
            {
                title: "Terms of Service",
                url: TERMS_OF_SERVICE_URL,
                external: true,
            },
        ],
    },
};

export const iconLinks = {
    discord: {
        url: DISCORD_SERVER_INVITE_URL,
        title: "Discord Community",
        icon: FaDiscord,
    },
    github: {
        url: GITHUB_REPO_URL,
        title: "GitHub Repository",
        icon: FaGithub,
    },
    email: {
        url: `mailto:${SUPPORT_EMAIL_ADDRESS}`,
        title: "Email Support",
        icon: FaEnvelope,
    },
    web: {
        url: "/",
        title: "Website",
        icon: FaGlobe,
    },
};
