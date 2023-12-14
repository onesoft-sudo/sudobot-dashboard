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
import NotFoundPage from "@/app/not-found";
import VerificationWizard from "@/components/Verify/VerificationWizard";
import { VerificationWizardContextProvider } from "@/contexts/VerificationWizardContext";
import { ServerSideComponentProps } from "@/types/ServerSideComponentProps";
import { AxiosError } from "axios";
import Script from "next/script";
import { FC, cache } from "react";
import { z } from "zod";

const getInfo = cache(async (token: string, userId: string) => {
    try {
        return await getVerificationInfo(token, userId);
    } catch (error) {
        console.error(error);

        if (error instanceof AxiosError && error.response?.status === 404) {
            return null;
        }

        return;
    }
});

export const generateMetadata = async ({
    searchParams,
}: ServerSideComponentProps) => {
    const requestFailed = !paramSchema.safeParse(searchParams).success;
    const _400 = {
        title: "400 Bad Request - SudoBot",
        description: "Whoops! Looks like you've done something wrong.",
    };

    if (requestFailed) {
        return _400;
    }

    const response = await getInfo(searchParams.t, searchParams.u);

    if (response === null) {
        return _400;
    }

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
    u: z.string().regex(/^\d+$/),
});

const VerifyPage: FC<ServerSideComponentProps> = async ({ searchParams }) => {
    if (!paramSchema.safeParse(searchParams).success) {
        return <BadRequestPage />;
    }

    const response = await getInfo(searchParams.t, searchParams.u);

    if (response === null) {
        return <NotFoundPage />;
    }

    if (!response) {
        return <InternalServerErrorPage />;
    }

    const data = response.data;
    const iconURL = data.icon
        ? `https://cdn.discordapp.com/icons/${encodeURIComponent(
              data.guildId
          )}/${encodeURIComponent(data.icon)}.webp`
        : null;

    return (
        <main className="min-h-[90vh] flex justify-center items-center">
            <Script
                src="https://www.google.com/recaptcha/api.js"
                async
                defer
            ></Script>

            <VerificationWizardContextProvider maxSteps={3}>
                <VerificationWizard info={{ ...data, iconURL }} />
            </VerificationWizardContextProvider>
        </main>
    );
};

export default VerifyPage;
