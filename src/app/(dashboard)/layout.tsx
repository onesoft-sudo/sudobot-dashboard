import EnsureAuthenticated from "@/components/Auth/EnsureAuthenticated";
import UnsavedChangesAlert from "@/components/Dashboard/UnsavedChangesAlert";
import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import ToastView from "@/components/Toast/ToastView";
import { ConfigMutationProvider } from "@/contexts/ConfigMutationProvider";
import { getAppRouterURL } from "@/utils/routing";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
    title: "SudoBot Dashboard",
    description: "The ultimate Discord Bot for moderation purposes.",
    robots: {
        follow: false,
        index: false,
    }
};

export default function DashboardLayout({ children }: PropsWithChildren) {
    const cookieStore = cookies();
    const { pathname } = getAppRouterURL();

    if (!cookieStore.get("logged_in")) {
        redirect(`/login?ct=${encodeURIComponent(pathname)}`);
    }

    return (
        <ConfigMutationProvider>
            <Navbar />
            <EnsureAuthenticated />
            <div className="lg:grid lg:h-[calc(100svh-4rem)] lg:grid-cols-[minmax(250px,20%)_auto] lg:gap-5 lg:overflow-y-hidden">
                <Sidebar className="z-50 hidden lg:block" />
                <div className="lg:h-[calc(100svh-3.2rem)] lg:overflow-y-scroll">{children}</div>
            </div>
            <UnsavedChangesAlert />
            <ToastView />
        </ConfigMutationProvider>
    );
}
