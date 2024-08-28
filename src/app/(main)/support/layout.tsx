import Footer from "@/components/Layout/Footer";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="min-h-screen block">{children}</div>
            <Footer />
        </>
    );
}
