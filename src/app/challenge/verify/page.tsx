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

import { getVerificationInfo } from "@/api/routes/verify";
import BadRequestPage from "@/app/bad-request";
import InternalServerErrorPage from "@/app/internal-server-error";
import VerificationMethod from "@/components/Verify/VerificationMethod";
import { ServerSideComponentProps } from "@/types/ServerSideComponentProps";
import Image from "next/image";
import Script from "next/script";
import { FC, cache } from "react";
import { FaEnvelope, FaGithub, FaGoogle, FaPuzzlePiece } from "react-icons/fa6";
import { z } from "zod";
import styles from "../../../styles/VerifyPage.module.css";

const getInfo = cache(async (token: string) => {
    try {
        return await getVerificationInfo(token);
    } catch (message) {
        console.error(message);
        return;
    }
});

export const generateMetadata = async ({
    searchParams,
}: ServerSideComponentProps) => {
    const requestFailed = !paramSchema.safeParse(searchParams).success;

    if (requestFailed) {
        return {
            title: "400 Bad Request - SudoBot",
            description: "Whoops! Looks like you've done something wrong.",
        };
    }

    const response = await getInfo(searchParams.token);

    return {
        title: !response
            ? "500 Internal Server Error - SudoBot"
            : "Verify - SudoBot",
        description: !response
            ? "Whoops! Looks like something is broken on our end."
            : undefined,
    };
};

const paramSchema = z.object({
    t: z.string(),
    ic: z.string(),
});

const VerifyPage: FC<ServerSideComponentProps> = async ({ searchParams }) => {
    if (!paramSchema.safeParse(searchParams).success) {
        return <BadRequestPage />;
    }

    const response = await getInfo(searchParams.t);

    if (!response) {
        return <InternalServerErrorPage />;
    }

    const { guildName, guildId } = response.data;
    const iconURL = `https://cdn.discordapp.com/icons/${encodeURIComponent(
        guildId
    )}/${encodeURIComponent(searchParams.ic)}.webp`;

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
                            src={iconURL}
                            alt="[icon]"
                            height={20}
                            width={20}
                            style={{
                                borderRadius: "50%",
                            }}
                        />

                        <h2>{guildName}</h2>
                    </a>
                </div>

                <div className="flex justify-center items-center">
                    <div className={styles.methods}>
                        <VerificationMethod
                            name="Google"
                            description="Verify using your Google account."
                            icon={FaGoogle}
                        />
                        <VerificationMethod
                            name="GitHub"
                            description="Verify using your GitHub account."
                            icon={FaGithub}
                        />
                        <VerificationMethod
                            name="Email"
                            description="Verify using your Email Address."
                            icon={FaEnvelope}
                        />
                        <VerificationMethod
                            name="Captcha"
                            description="Verify by solving a Captcha."
                            icon={FaPuzzlePiece}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VerifyPage;
