"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="md:grid md:grid-cols-[25%_73%] lg:grid-cols-[15%_83%] h-[100%] gap-[2%]">
            <Sidebar />
            {children}
        </div>
    );
};

export default DashboardLayout;
