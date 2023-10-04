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

import LoginForm from "@/components/Login/LoginForm";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Login - SudoBot",
    description: "Log into SudoBot's control panel.",
};

const Login: FC = () => {
    return (
        <main className="min-h-[90vh] flex justify-center items-center">
            <div>
                <h1 className="text-3xl md:text-4xl text-center pb-[20px] md:pb-[50px] pt-5 md:pt-0">
                    Login
                </h1>

                <div className="flex justify-center items-center">
                    <LoginForm />
                </div>
            </div>
        </main>
    );
};

export default Login;
