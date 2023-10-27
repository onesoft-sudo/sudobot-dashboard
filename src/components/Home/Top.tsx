/*
 * This file is part of SudoBot Dashboard.
 *
 * Copyright (C) 2021-2023 OSN Developers.
 *
 * SudoBot Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SudoBot Dashboard is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
 */

import { Manrope } from "next/font/google";
import { FC } from "react";
import Shield from "../Images/Shield";
import HomeButtons from "./HomeButtons";

const manrope = Manrope({
    subsets: ["latin"],
});

const Top: FC = () => {
    return (
        <div
            className={`min-h-[calc(100vh-50px)] p-3 md:p-[25px] lg:p-[50px] xl:py-[80px] xl:px-[70px] ${manrope.className}`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[200px] w-[200px] md:h-[600px] md:w-[600px] bg-[linear-gradient(45deg,#007bff,#19dafa)] blur-[130px] md:blur-[350px] top-[100px] md:top-0 left-[50%] translate-x-[-50%] md:translate-x-0 md:left-0 absolute z-[0]"></div>

                <div className="z-[10]">
                    <h1 className="block z-10 [line-height:2rem] md:[line-height:3.2rem] [font-size:2rem] md:text-5xl lg:text-6xl xl:text-7xl font-light md:font-bold text-center md:text-left">
                        The ultimate{" "}
                        <span className="gradient-text">Discord Bot</span>.
                        <span className="hidden md:inline">
                            <br />
                            <span className="block pt-8"></span>
                            With every{" "}
                            <span className="gradient-text">
                                moderation tool
                            </span>{" "}
                            you&rsquo;ll ever need.
                        </span>
                    </h1>

                    <div className="h-[5px] w-[50%] md:w-[20%] bg-[linear-gradient(45deg,#007bff,#19dafa)] rounded-lg mt-8 mx-auto md:mx-0"></div>

                    <h1 className="block z-10 pt-8 [line-height:2rem] md:[line-height:3.2rem] [font-size:3rem] md:text-5xl lg:text-6xl xl:text-7xl font-light md:font-bold text-center md:text-left">
                        <span className="gradient-text">SudoBot.</span>
                    </h1>

                    <br />
                    <br />
                    <div className="md:hidden relative justify-center items-start flex pb-[40px]">
                        <Shield sizes="100vw" />
                    </div>
                    <br />

                    <HomeButtons />
                </div>
                <div className="hidden md:block">
                    <div className="relative justify-end items-start flex md:pr-[2vw]">
                        <Shield sizes="80vw" className="-mt-[40px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Top;
