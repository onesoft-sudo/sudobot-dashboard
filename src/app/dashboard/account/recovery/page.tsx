"use client";

import ChangePassword from "@/components/AccountRecovery/ChangePassword";
import RecoverAccount from "@/components/AccountRecovery/RecoverAccount";
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { FC } from "react";

const RecoveryPage: FC = () => {
    const [user] = useUser();
    const pathname = usePathname();

    if (!user && pathname !== "/dashboard/account/recovery") {
        return <></>;
    }

    return (
        <div className="min-h-[90vh] flex justify-center items-center relative">
            <div>
                <h1 className="text-3xl md:text-4xl text-center pb-[20px] md:pb-[50px] pt-5 md:pt-0">
                    {user ? "Change your password" : "Recover your account"}
                </h1>

                <div className="flex justify-center items-center">
                    {user ? <ChangePassword /> : <RecoverAccount />}
                </div>
            </div>
        </div>
    );
};

export default RecoveryPage;
