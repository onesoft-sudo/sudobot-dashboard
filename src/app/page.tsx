import Image from "next/image";
import shieldImage from "../images/sudobot-shield.png";
import HomeButtons from "./HomeButtons";

export default function Home() {
    return (
        <main className="main min-h-[85vh] px-4 md:px-[10%] pt-3 grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="md:pt-[15%]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-left">
                    A single Discord Bot for everything you need.
                    <br />
                    <span className="text-blue-600 mt-4 inline-block">
                        SudoBot
                    </span>
                    .
                </h1>

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
            <div className="relative flex justify-center items-center">
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
        </main>
    );
}
