"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="md:grid grid-cols-[15%_83%] gap-[2%]">
            <Sidebar />
            {children}
        </div>
    );
};

export default DashboardLayout;
