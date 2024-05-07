import HeadingDivider from "@/components/Dividers/HeadingDivider";
import background from "@/images/background.svg";
import { Button } from "@nextui-org/button";
import { Manrope } from "next/font/google";
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
                <div
                    className="pt-4 md:pt-6 lg:pt-10 xl:pt-[6rem] relative min-h-[95svh] px-3 md:px-0 flex flex-col md:block justify-between pb-7 md:pb-0"
                    style={{
                        backdropFilter: "blur(150px)",
                    }}
                >
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
                            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center block xl:leading-[5rem] relative z-1 py-5 lg:pt-10"
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

            <div className="max-w-[100svw] mx-auto py-4 md:py-6 lg:py-10">
                <h2 className="text-2xl lg:text-4xl xl:text-5xl font-semibold text-center block xl:leading-[5rem] relative z-1">
                    Features
                </h2>

                <HeadingDivider size={5} />
            </div>
        </main>
    );
}
