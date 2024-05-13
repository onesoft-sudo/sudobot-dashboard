import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            <div className="lg:grid lg:h-[calc(100svh-3.2rem)] lg:grid-cols-[minmax(250px,20%)_auto] lg:gap-5">
                <Sidebar className="z-[100] hidden lg:block" />
                <div className="lg:h-[calc(100svh-3.2rem)] lg:overflow-y-scroll">{children}</div>
            </div>
        </>
    );
}
