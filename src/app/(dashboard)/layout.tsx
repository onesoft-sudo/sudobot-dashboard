import UnsavedChangesAlert from "@/components/Dashboard/UnsavedChangesAlert";
import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ConfigMutationProvider } from "@/contexts/ConfigMutationProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const cookieStore = cookies();

    if (!cookieStore.get("logged_in")) {
        redirect("/login");
    }

    return (
        <ConfigMutationProvider>
            <Navbar />
            <div className="lg:grid lg:h-[calc(100svh-4rem)] lg:grid-cols-[minmax(250px,20%)_auto] lg:gap-5 lg:overflow-y-hidden">
                <Sidebar className="z-[100] hidden lg:block" />
                <div className="lg:h-[calc(100svh-3.2rem)] lg:overflow-y-scroll">{children}</div>
            </div>
            <UnsavedChangesAlert />
        </ConfigMutationProvider>
    );
}
