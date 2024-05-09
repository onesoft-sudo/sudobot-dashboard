import FeatureCard from "@/components/Cards/FeatureCard";
import HeadingDivider from "@/components/Dividers/HeadingDivider";
import activeDevelopment from "@/images/active-development.png";
import autoModeration from "@/images/auto-moderation.png";
import background from "@/images/background.svg";
import chatModeration from "@/images/chat-moderation.png";
import licensing from "@/images/licensing.png";
import { Box } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { HiCheck, HiCode } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineShieldCheck, HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { MdArrowForward, MdLink } from "react-icons/md";

const manrope = Manrope({ subsets: ["latin"] });

export default function Home() {
    return (
        <main>
            <div
                className="relative max-h-svh min-h-[95svh] max-w-[100svw]"
                style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    backgroundOrigin: "border-box",
                }}
            >
                <div className="relative flex min-h-[95svh] flex-col justify-between px-3 pb-7 pt-4 md:block md:px-0 md:pb-0 md:pt-6 lg:pt-10 xl:pt-24">
                    <div>
                        <h1
                            className="relative block text-center text-5xl font-bold lg:text-6xl xl:text-7xl xl:leading-[5rem]"
                            style={manrope.style}
                        >
                            The new way to{" "}
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                moderate
                            </span>{" "}
                            your
                            <br /> Discord server.
                        </h1>

                        <HeadingDivider />

                        <h1
                            className="relative block py-5 pt-12 text-center text-4xl font-bold lg:pt-10 lg:text-5xl xl:text-6xl xl:leading-[5rem]"
                            style={manrope.style}
                        >
                            <span className="text-gray-400">Meet</span>{" "}
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                SudoBot.
                            </span>
                        </h1>

                        <h4 className="pb-3 text-center text-sm text-gray-400 md:text-medium">
                            Now celebrating the latest 9.0 beta release!
                        </h4>
                    </div>

                    <div className="items-center justify-center gap-2 py-5 md:flex md:pt-10 lg:pt-20">
                        <Button
                            startContent={<MdLink size={20} />}
                            size="lg"
                            color="primary"
                            variant="flat"
                            className="w-full md:w-auto"
                        >
                            Invite SudoBot
                        </Button>

                        <Button
                            endContent={<MdArrowForward size={20} />}
                            size="lg"
                            color="primary"
                            variant="flat"
                            className="mt-3 w-full md:mt-0 md:w-auto"
                        >
                            Set up manually
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[100svw] px-3 py-4 md:px-7 md:py-6 lg:p-10 xl:px-16">
                <h2 className="relative block text-center text-2xl lg:text-3xl xl:text-4xl">Why SudoBot?</h2>

                <HeadingDivider size={4} className="mt-4 h-[2px] bg-[#007bff] [background-image:none]" />
                <Box pt="2rem" />

                <div className="grid grid-cols-1 gap-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] 2xl:grid-cols-[1fr_2fr_1fr_1fr]">
                        <FeatureCard className="relative grid grid-rows-2 gap-5">
                            <div className="flex flex-col items-center justify-center p-3 text-center">
                                <HiOutlineBolt size="2rem" className="mx-auto mb-3 block text-[#007bff]" />
                                <h4 className="my-2 text-lg text-black lg:text-xl dark:text-white">
                                    Manual Moderation
                                </h4>
                                <p className="text-[#444] dark:text-[#999]">
                                    SudoBot provides a wide range of manual moderation tools to keep your server safe
                                    and secure.
                                </p>
                            </div>
                            <div className="flex min-h-max flex-col items-center justify-center bg-black">
                                <Image src={chatModeration} alt="Moderation" />
                            </div>
                        </FeatureCard>

                        <FeatureCard className="relative grid grid-cols-1 2xl:grid-cols-2">
                            <div className="flex flex-col justify-between py-6 pl-6 pr-4">
                                <div>
                                    <HiOutlineShieldCheck size="2rem" className="mb-3 block text-[#007bff]" />
                                    <h4 className="mb-2 mt-6 text-lg text-black lg:text-xl dark:text-white">
                                        Auto Moderation
                                    </h4>
                                    <p className="text-[#444] dark:text-[#999]">
                                        SudoBot includes a powerful auto-moderation system that understands your
                                        community&rsquo;s needs and can automatically moderate your server, so you can
                                        focus on other things.
                                    </p>
                                </div>
                                <div>
                                    <ul className="mt-4 list-none text-sm text-[#444] dark:text-[#999]">
                                        {[
                                            "Spam Protection",
                                            "Raid Protection",
                                            "Message Scanning",
                                            "Automatic Actions",
                                        ].map((feature) => (
                                            <li key={feature} className="flex items-center gap-1">
                                                <HiCheck size="1.2rem" className="text-blue-500" />
                                                <span className="text-black dark:text-white">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex min-h-max flex-col items-center justify-center bg-black">
                                <Image src={autoModeration} alt="Auto Moderation" />
                            </div>
                        </FeatureCard>

                        <FeatureCard className="relative grid grid-rows-2 gap-5">
                            <div className="flex flex-col items-center justify-center p-3 text-center">
                                <HiCode size="2rem" className="mx-auto mb-3 block text-[#007bff]" />
                                <h4 className="my-2 text-lg text-black lg:text-xl dark:text-white">
                                    Free &amp; Open Source
                                </h4>
                                <p className="text-[#444] dark:text-[#999]">
                                    SudoBot is free and open source, respecting your freedom. It is licensed under{" "}
                                    <Link href="https://gnu.org/licenses/agpl-3.0.html">
                                        GNU Affero General Public License v3.0
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="flex min-h-max flex-col items-center justify-center bg-black">
                                <Image src={licensing} alt="Auto Moderation" />
                            </div>
                        </FeatureCard>

                        <FeatureCard className="relative grid grid-rows-2 gap-5">
                            <div className="flex flex-col items-center justify-center p-3 text-center">
                                <HiOutlineWrenchScrewdriver size="2rem" className="mx-auto mb-3 block text-[#007bff]" />
                                <h4 className="my-2 text-lg text-black lg:text-xl dark:text-white">
                                    Active Development
                                </h4>
                                <p className="text-[#444] dark:text-[#999]">
                                    We are actively adding new features and fixing issues. We always welcome new feature
                                    requests or improvement ideas.
                                </p>
                            </div>
                            <div className="flex min-h-max flex-col items-center justify-center bg-black">
                                <Image src={activeDevelopment} alt="Active Development" />
                            </div>
                        </FeatureCard>
                    </div>
                </div>
            </div>
        </main>
    );
}
