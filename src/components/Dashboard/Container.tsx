import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
    return <div className="px-3 py-4 lg:pl-1 lg:pr-4">{children}</div>;
}
