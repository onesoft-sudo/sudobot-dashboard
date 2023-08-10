"use client";

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { FC } from "react";

const Welcome: FC = () => {
    const { user } = useAuthWithCheck();

    if (!user) {
        return <></>;
    }

    return (
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center pt-7">
            Welcome to The Control Panel,{" "}
            <span className="text-blue-600">
                {user?.name ? user?.name.split(/\s+/)[0] : user?.username}
            </span>
            !
        </h1>
    );
};

export default Welcome;
