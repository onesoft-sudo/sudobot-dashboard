import { PropsWithChildren } from "react";
import { MUIProvider } from "./mui";

export default function Providers({ children }: PropsWithChildren) {
    return <MUIProvider>{children}</MUIProvider>;
}
