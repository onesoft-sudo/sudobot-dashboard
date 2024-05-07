import Navbar from "@/components/Navigation/Navbar";
import { PropsWithChildren, type FC } from "react";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default MainLayout;
