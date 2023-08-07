import {
    BOT_GITHUB_REPO_URL,
    BOT_INVITE_REQUEST_URL,
    BOT_PRIVACY_POLICY_URL,
    BOT_STATUS_PAGE_URL,
    BOT_TERMS_URL,
    SUPPORT_EMAIL_ADDRESS,
    SUPPORT_SERVER_INVITE,
} from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaDiscord, FaEnvelope, FaGithub, FaGlobe } from "react-icons/fa6";
import logo from "../../images/logo.png";

const links = {
    Support: [
        {
            name: "Discord Server",
            url: SUPPORT_SERVER_INVITE,
        },
        {
            name: "Email",
            url: SUPPORT_EMAIL_ADDRESS,
        },
        {
            name: "GitHub",
            url: BOT_GITHUB_REPO_URL,
        },
    ],
    Resources: [
        {
            name: "Service status",
            url: BOT_STATUS_PAGE_URL,
        },
        {
            name: "Request an Invite",
            url: BOT_INVITE_REQUEST_URL,
        },
    ],
    Legal: [
        {
            name: "Terms of Service",
            url: BOT_TERMS_URL,
        },
        {
            name: "Privacy Policy",
            url: BOT_PRIVACY_POLICY_URL,
        },
    ],
};

const iconLinks = [
    {
        icon: FaDiscord,
        url: SUPPORT_SERVER_INVITE,
        name: "Discord",
    },
    {
        icon: FaGithub,
        url: BOT_GITHUB_REPO_URL,
        name: "GitHub",
    },
    {
        icon: FaEnvelope,
        url: SUPPORT_EMAIL_ADDRESS,
        name: "Email",
    },
    {
        icon: FaGlobe,
        url: "/",
        name: "Website",
    },
];

const Footer: FC = () => {
    return (
        <footer
            style={{
                background:
                    "linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.2))",
            }}
        >
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={logo.src}
                                alt="SudoBot Logo"
                                height={30}
                                width={30}
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-3">
                                SudoBot
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        {Object.entries(links).map(([category, urls]) => (
                            <div key={category}>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                    {category}
                                </h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    {urls.map(({ name, url }) => (
                                        <li
                                            className="mb-4"
                                            key={`${name}_${url}`}
                                        >
                                            <Link
                                                href={url}
                                                className="hover:underline"
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        Copyright © 2023{" "}
                        <Link href="/" className="hover:underline">
                            OSN, Inc
                        </Link>
                        .
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        {iconLinks.map(link => (
                            <a
                                key={link.url}
                                href={link.url}
                                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            >
                                <link.icon />
                                <span className="sr-only">{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
