import { PropsWithChildren } from "react";

export default function CardGrid({ children }: PropsWithChildren) {
    return (
        <div className="mt-7 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children}
        </div>
    );
}
