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
