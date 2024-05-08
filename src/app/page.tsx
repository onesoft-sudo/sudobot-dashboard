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
                className="relative max-h-[100svh] min-h-[95svh] max-w-[100svw]"
                style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%",
                    backgroundRepeat: "no-repeat",
                    backgroundOrigin: "border-box",
                }}
            >
                <div className="pt-4 md:pt-6 lg:pt-10 xl:pt-[6rem] relative min-h-[95svh] px-3 md:px-0 flex flex-col md:block justify-between pb-7 md:pb-0">
                    <div>
                        <h1
                            className="text-5xl lg:text-6xl xl:text-7xl font-bold text-center block xl:leading-[5rem] relative z-1"
                            style={manrope.style}
                        >
                            The new way to{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                                moderate
                            </span>{" "}
                            your
                            <br /> Discord server.
                        </h1>

                        <HeadingDivider />

                        <h1
                            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center block xl:leading-[5rem] relative z-1 py-5 pt-[3rem] lg:pt-10"
                            style={manrope.style}
                        >
                            <span className="text-gray-400">Meet</span>{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                                SudoBot.
                            </span>
                        </h1>

                        <h4 className="text-center text-gray-400 pb-3 text-sm md:text-medium">
                            Now celebrating the latest 9.0 beta release!
                        </h4>
                    </div>

                    <div className="md:flex items-center justify-center pb-5 pt-5 md:pt-10 lg:pt-20 gap-2">
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
                            className="w-full md:w-auto mt-3 md:mt-0"
                        >
                            Set up manually
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-[100svw] mx-auto py-4 md:py-6 lg:py-10 px-3 md:px-7 lg:px-10 xl:px-16">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl text-center block relative z-1">Why SudoBot?</h2>

                <HeadingDivider size={4} className="[background-image:none] bg-[#007bff] h-[2px] mt-4" />
                <Box pt="2rem" />

                <div className="grid grid-cols-1 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] 2xl:grid-cols-[1fr_2fr_1fr_1fr] gap-5">
                        <FeatureCard className="relative grid grid-rows-2 gap-5">
                            <div className="text-center p-3 flex justify-center items-center flex-col">
                                <HiOutlineBolt size="2rem" className="block mx-auto text-[#007bff] mb-3" />
                                <h4 className="text-black dark:text-white text-lg lg:text-xl my-2">
                                    Manual Moderation
                                </h4>
                                <p className="text-[#444] dark:text-[#999]">
                                    SudoBot provides a wide range of manual moderation tools to keep your server safe
                                    and secure.
                                </p>
                            </div>
                            <div className="bg-black flex flex-col justify-center items-center min-h-max">
                                <Image src={chatModeration} alt="Moderation" />
                            </div>
                        </FeatureCard>

                        <FeatureCard className="relative grid grid-cols-1 2xl:grid-cols-2">
                            <div className="py-6 pr-4 pl-6 flex flex-col justify-between">
                                <div>
                                    <HiOutlineShieldCheck size="2rem" className="block text-[#007bff] mb-3" />
                                    <h4 className="text-black dark:text-white text-lg lg:text-xl mb-2 mt-6">
                                        Auto Moderation
                                    </h4>
                                    <p className="text-[#444] dark:text-[#999]">
                                        SudoBot includes a powerful auto-moderation system that understands your
                                        community&rsquo;s needs and can automatically moderate your server, so you can
                                        focus on other things.
                                    </p>
                                </div>
                                <div>
                                    <ul className="list-none text-[#444] dark:text-[#999] mt-4 text-sm">
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
                            <div className="bg-black flex flex-col justify-center items-center min-h-max">
                                <Image src={autoModeration} alt="Auto Moderation" />
                            </div>
                        </FeatureCard>

                        <FeatureCard className="relative grid grid-rows-2 gap-5">
                            <div className="text-center p-3 flex justify-center items-center flex-col">
                                <HiCode size="2rem" className="block mx-auto text-[#007bff] mb-3" />
                                <h4 className="text-black dark:text-white text-lg lg:text-xl my-2">
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
                            <div className="bg-black flex flex-col justify-center items-center min-h-max">
                                <Image src={licensing} alt="Auto Moderation" />
                            </div>
                        </FeatureCard>

                        <FeatureCard className="relative grid grid-rows-2 gap-5">
                            <div className="text-center p-3 flex justify-center items-center flex-col">
                                <HiOutlineWrenchScrewdriver size="2rem" className="block mx-auto text-[#007bff] mb-3" />
                                <h4 className="text-black dark:text-white text-lg lg:text-xl my-2">
                                    Active Development
                                </h4>
                                <p className="text-[#444] dark:text-[#999]">
                                    We are actively adding new features and fixing issues. We always welcome new feature
                                    requests or improvement ideas.
                                </p>
                            </div>
                            <div className="bg-black flex flex-col justify-center items-center min-h-max">
                                <Image src={activeDevelopment} alt="Active Development" />
                            </div>
                        </FeatureCard>
                    </div>
                </div>
            </div>
        </main>
    );
}
