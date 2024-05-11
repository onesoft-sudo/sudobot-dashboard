import { PropsWithChildren } from "react";
import MainLayout from "./MainLayout";

export default function LayoutRenderer({ children }: PropsWithChildren) {
    return <MainLayout>{children}</MainLayout>;
}
