import Sidebar from "@/components/Dashboard/Sidebar";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="md:grid md:grid-cols-[25%_73%] lg:grid-cols-[15%_83%] h-[100%] max-h-[89vh] gap-[2%]">
            <Sidebar />
            <div className="max-h-[100%] relative overflow-y-scroll">
                {children}
            </div>
        </div>
    );
};

export default Layout;
