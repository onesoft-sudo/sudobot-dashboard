import { iconLinks, links } from "@/config/footer";
import { OSN_GITHUB_URL } from "@/constants/links";
import Link from "next/link";
import Brand from "../Branding/Brand";

export default function Footer() {
    return (
        <footer className="bg-white shadow-[0_0_2px_rgba(0,0,0,0.2)] dark:bg-[rgb(25,25,25)] dark:shadow-none">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Brand />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
                        {Object.entries(links).map(([key, value]) => (
                            <div key={key}>
                                <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                                    {value.groupName}
                                </h2>
                                <ul className="font-medium text-gray-500 dark:text-gray-400">
                                    {value.links.map((link) => {
                                        const Render =
                                            "render" in link &&
                                            typeof link.render === "function"
                                                ? link.render
                                                : undefined;

                                        return (
                                            <li
                                                key={`${link.title}_${link.url ?? link.id ?? ""}`}
                                                className="mb-4 last:mb-0"
                                            >
                                                {Render ? (
                                                    <Render link={link} />
                                                ) : (
                                                    <Link
                                                        href={link.url ?? "#"}
                                                        title={link.title}
                                                        target={
                                                            link.url
                                                                ? "_blank"
                                                                : undefined
                                                        }
                                                        className="hover:underline"
                                                    >
                                                        {link.title}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
                        Copyright © {new Date().getFullYear()}{" "}
                        <Link href={OSN_GITHUB_URL} className="hover:underline">
                            OSN, Inc
                        </Link>
                        .
                    </span>
                    <div className="mt-4 flex sm:mt-0 sm:justify-center">
                        {Object.entries(iconLinks).map(([key, value]) => (
                            <Link
                                key={key}
                                href={value.url}
                                title={value.title}
                                className="ms-5 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            >
                                <value.icon />
                                <span className="sr-only">{value.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
