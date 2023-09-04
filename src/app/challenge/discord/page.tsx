"use client";

import { discordLogin } from "@/api/auth";
import DiscordLogin from "@/components/Login/DiscordLogin";
import { AuthContextAction, useAuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import useSessionStorage from "@/hooks/useSessionStorage";
import { LinearProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { MdCheck, MdErrorOutline, MdWarning } from "react-icons/md";

const DiscordChallenge: FC = () => {
    const params = useSearchParams()!;
    const router = useRouterContext();
    const { user, dispatch } = useAuthContext();
    const [oauthState] = useSessionStorage("discord_oauth_state");
    const [{ invalidState, error, success }, setState] = useState({
        invalidState: false,
        error: null,
        success: false,
    });
    const isProcessingRef = useRef(false);

    useEffect(() => {
        if (user === undefined) {
            return;
        }

        if (user) {
            router?.push("/dashboard");
        }

        if (!params.get("code") || !params.get("state")) {
            router?.push("/login");
        }
    }, [params, user]);

    useEffect(() => {
        if (invalidState) {
            return;
        }

        console.log(oauthState);

        if (oauthState !== undefined && oauthState !== params.get("state")) {
            console.warn("States did not match!");
            setState(s => ({ ...s, invalidState: true }));
            return;
        }

        const code = params.get("code");

        if (!code || isProcessingRef.current) {
            return;
        }

        isProcessingRef.current = true;

        discordLogin({ code })
            .then(data => {
                console.log(data);
                setState(s => ({ ...s, success: true }));
                console.log("Login successful");

                try {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.data.user)
                    );
                } catch (e) {}

                dispatch?.({
                    type: AuthContextAction.Login,
                    payload: {
                        user: data.data.user,
                    },
                });

                router?.push("/dashboard");
            })
            .catch(error => {
                console.error(error);
                setState(s => ({ ...s, error }));
            });
    }, [oauthState]);

    return (
        <main className="min-h-[90vh] flex justify-center items-center">
            <div>
                <h1 className="text-3xl md:text-4xl text-center pb-[20px] md:pb-[50px]">
                    Login With Discord
                </h1>

                <div
                    className="mx-3 md:mx-auto my-3 overflow-hidden rounded-sm md:w-[20vw]"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                        boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
                    }}
                >
                    {!invalidState && !error && <LinearProgress />}

                    <br />
                    <div className="p-4">
                        {invalidState ? (
                            <MdWarning
                                size={50}
                                className="mx-auto block my-3 text-yellow-500"
                            />
                        ) : error ? (
                            <MdErrorOutline
                                size={50}
                                className="mx-auto block my-3 text-red-500"
                            />
                        ) : success ? (
                            <MdCheck
                                size={50}
                                className="mx-auto block my-3 text-green-500"
                            />
                        ) : null}

                        <h2 className="text-2xl md:text-3xl text-center">
                            {invalidState
                                ? "Invalid OAuth2 State"
                                : error
                                ? "An error has occurred"
                                : success
                                ? "Success!"
                                : "Please wait"}
                        </h2>

                        <p className="text-md mt-3 text-[#999] text-center">
                            {invalidState
                                ? "Looks like the state query parameter is wrong. Make sure you've visited the correct URL/site and not being referred from other websites."
                                : error
                                ? "Uh oh! Looks like we've ran into an issue. Please try again."
                                : success
                                ? "We've logged you in. You'll be redirected shortly."
                                : "We're logging you in."}
                        </p>

                        <br />

                        {invalidState && (
                            <div className="pt-3">
                                <DiscordLogin label="Retry Discord Login" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DiscordChallenge;
