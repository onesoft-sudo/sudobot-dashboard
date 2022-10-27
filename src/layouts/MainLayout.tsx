import { PropsWithChildren } from "react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}