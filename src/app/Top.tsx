import Image from "next/image";
import { FC } from "react";
import shieldImage from "../images/sudobot-shield.png";
import HomeButtons from "./HomeButtons";

const Top: FC = () => {
    return (
        <div className="min-h-[85vh] px-4 md:px-[10%] pt-3 grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="md:pt-[15%]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left">
                    A single Discord Bot for everything you need.
                </h1>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left text-blue-600 my-5">
                    SudoBot<span className="text-white">.</span>
                </h1>

                <h2 className="hidden md:block text-3xl md:text-4xl font-light text-center md:text-left">
                    The ultimate solution for Discord Server Moderation.
                </h2>

                <br />

                <div
                    style={{
                        height: 5,
                        width: "100%",
                        background:
                            "linear-gradient(to right, rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.6))",
                        borderRadius: 20,
                    }}
                ></div>

                <br />
                <br />

                <HomeButtons />
            </div>
            <div className="relative justify-center items-center hidden md:flex">
                <Image
                    src={shieldImage.src}
                    alt="Banner"
                    width={0}
                    height={0}
                    sizes="80vw"
                    style={{
                        width: "80%",
                        height: "auto",
                        background:
                            "linear-gradient(rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.2))",
                        borderRadius: "20px",
                    }}
                />
            </div>
        </div>
    );
};

export default Top;
