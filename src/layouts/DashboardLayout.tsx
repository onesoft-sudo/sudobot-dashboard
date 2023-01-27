import { PropsWithChildren } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <header>
                <Navbar centered={false} />
            </header>
            <div className="md:grid grid-cols-[1fr_6fr] gap-5 p-3 min-h-[80vh]">
                <aside className="mb-8">
                    <Sidebar />
                </aside>
                <main>
                    {children}
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}