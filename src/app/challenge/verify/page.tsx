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

import Captcha from "@/components/Verify/Captcha";
import { Metadata } from "next";
import Script from "next/script";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Verify - SudoBot",
    description: "Log into SudoBot's control panel.",
};

const VerifyPage: FC = () => {
    return (
        <main className="min-h-[90vh] flex justify-center items-center">
            <Script
                src="https://www.google.com/recaptcha/api.js"
                async
                defer
            ></Script>

            <div>
                <h1 className="text-3xl md:text-4xl text-center pt-5 md:pt-0">
                    Verify
                </h1>
                <p className="text-center text-[#999] pb-[20px] md:pb-[50px] pt-3">
                    Please verify yourself to continue.
                </p>

                <div className="flex justify-center items-center">
                    <form
                        method="POST"
                        action="#"
                        className="bg-[#222] rounded-lg p-3"
                    >
                        <div className="flex">
                            <Captcha />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default VerifyPage;
