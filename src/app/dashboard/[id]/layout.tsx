"use client";

import ForbiddenPage from "@/app/forbidden";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useAuthContext } from "@/contexts/AuthContext";
import { useParams } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthContext();
    const { id } = useParams()!;

    if (!user || user?.guilds === undefined || user?.guilds === null)
        return null;

    return (
        <>
            {!user?.guilds.find(g => g.id === id) ? (
                <ForbiddenPage />
            ) : (
                <div className="md:grid md:grid-cols-[25%_73%] lg:grid-cols-[15%_83%] h-[100%] max-h-[89vh] gap-[2%]">
                    <Sidebar />
                    <div className="max-h-[100%] relative overflow-y-scroll">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardLayout;
