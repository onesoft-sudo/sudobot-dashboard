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

import BadRequestPage from "@/app/bad-request";
import { ServerSideComponentProps } from "@/types/ServerSideComponentProps";
import Image from "next/image";
import Script from "next/script";
import { FC } from "react";
import { MdArrowRight } from "react-icons/md";
import { z } from "zod";
import styles from "../../../styles/VerifyPage.module.css";

export const generateMetadata = ({
    searchParams,
}: ServerSideComponentProps) => {
    const requestFailed = !paramSchema.safeParse(searchParams).success;

    return {
        title: requestFailed ? "400 Bad Request - SudoBot" : "Verify - SudoBot",
        description: requestFailed
            ? "Whoops! Looks like you've done something wrong."
            : "Log into SudoBot's control panel.",
    };
};

const paramSchema = z.object({
    u: z
        .string({
            required_error: "Must provide a user ID",
        })
        .min(5, "Invalid snowflake")
        .regex(/^\d+$/, "Invalid snowflake"),
    t: z.string({
        required_error: "Must provide a valid verification key",
    }),
    g: z
        .string({
            required_error: "Must provide a guild ID",
        })
        .min(5, "Invalid snowflake")
        .regex(/^\d+$/, "Invalid snowflake"),
    n: z.string({
        required_error: "Must provide a guild name",
    }),
});

const VerifyPage: FC<ServerSideComponentProps> = ({ searchParams }) => {
    if (!paramSchema.safeParse(searchParams).success) {
        return <BadRequestPage />;
    }

    return (
        <main className="min-h-[90vh] flex justify-center items-center">
            <Script
                src="https://www.google.com/recaptcha/api.js"
                async
                defer
            ></Script>

            <div>
                <h1 className="text-3xl md:text-4xl text-center pt-5 md:pt-0">
                    Choose a verification method
                </h1>
                <div className="text-center text-[#999] mt-3 flex items-center justify-center pt-3 pb-[20px] md:pb-[50px]">
                    <p className="inline-block">to continue to</p>
                    <a
                        href="#"
                        className="no-underline text-[#007bff] font-bold ml-3 inline-flex justify-center items-center gap-2 bg-[rgba(0,123,255,0.25)] px-2 py-1 rounded-lg"
                    >
                        <Image
                            src="https://cdn.discordapp.com/icons/964969362073198652/72513102a786e607bc8d47ffc342a1f0.webp"
                            alt="[icon]"
                            height={20}
                            width={20}
                            style={{
                                borderRadius: "50%",
                            }}
                        />

                        <h2>OneSoftNet</h2>
                    </a>
                </div>

                <div className="flex justify-center items-center">
                    <div className={styles.methods}>
                        <a href="#">
                            <span>
                                <h2>Google</h2>
                                <p>Verify using your Google account.</p>
                            </span>
                            <span>
                                <MdArrowRight size={20} />
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <h2>GitHub</h2>
                                <p>Verify using your GitHub account.</p>
                            </span>
                            <span>
                                <MdArrowRight size={20} />
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <h2>Email</h2>
                                <p>Verify using your Email Address.</p>
                            </span>
                            <span>
                                <MdArrowRight size={20} />
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <h2>Captcha</h2>
                                <p>Verify by solving a Captcha.</p>
                            </span>
                            <span>
                                <MdArrowRight size={20} />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VerifyPage;
