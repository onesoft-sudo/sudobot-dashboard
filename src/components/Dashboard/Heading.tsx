import { PropsWithChildren } from "react";

export default function Heading({ children }: PropsWithChildren) {
    return <h1 className="text-3xl font-semibold">{children}</h1>;
}
