import { FC } from "react";
import Shield from "../Images/Shield";
import HomeButtons from "./HomeButtons";

const Top: FC = () => {
    return (
        <div className="min-h-[90vh] px-4 md:px-[10%] pt-[30px] md:pt-3 grid grid-cols-1 md:grid-cols-2 gap-20 pb-[70px] md:pb-0">
            <div className="md:pt-[15%] relative z-[1]">
                <div className="flex md:block flex-col justify-between md:h-[auto]">
                    <div>
                        <div
                            style={{
                                width: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: -1,
                                display: "block",
                                background:
                                    "linear-gradient(to right, rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.38), rgba(0, 123, 255, 0.05))",
                                filter: "blur(100px)",
                            }}
                            className="h-[60%] md:h-[80%]"
                        ></div>
                        <h1 className="[line-height:2rem] md:[line-height:3.2rem] [font-size:2rem] md:text-5xl lg:text-6xl font-light md:font-bold text-center md:text-left">
                            A single Discord Bot for everything you need.
                        </h1>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium md:font-bold text-center md:text-left my-5">
                            <span
                                style={{
                                    background:
                                        "linear-gradient(-45deg, #19dafa, #007bff)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    color: "transparent",
                                }}
                            >
                                SudoBot
                            </span>
                            <span className="text-white">.</span>
                        </h1>

                        <h2 className="my-3 md:my-0 text-2xl md:text-4xl font-light text-center md:text-left hidden md:block">
                            The ultimate solution for Discord Server Moderation.
                        </h2>

                        <div className="relative flex justify-center items-center pt-3 md:hidden">
                            <Shield
                                style={{
                                    width: "90%",
                                    background:
                                        "linear-gradient(rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.1))",
                                }}
                            />
                        </div>

                        <br />

                        <div
                            style={{
                                height: 5,
                                width: "100%",
                                background:
                                    "linear-gradient(to right, rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.6))",
                                borderRadius: 20,
                                marginBottom: "20px",
                            }}
                            className="mt-[20px] md:mt-10px"
                        ></div>
                    </div>

                    <div className="md:mt-[40px]">
                        <HomeButtons />
                    </div>
                </div>
            </div>
            <div className="relative justify-center items-center hidden md:flex">
                <Shield />
            </div>
        </div>
    );
};

export default Top;
