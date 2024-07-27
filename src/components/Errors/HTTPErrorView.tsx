import { ReactNode, type FC } from "react";
import Link from "../Navigation/Link";

type HTTPErrorViewProps = {
    statusCode: number;
    statusText: string;
    children: ReactNode;
};

const HTTPErrorView: FC<HTTPErrorViewProps> = ({ children, statusCode, statusText }) => {
    return (
        <div className="flex min-h-[80svh] items-center justify-center">
            <main className="mx-auto my-5 w-96 text-center lg:my-10">
                <h1 className="text-3xl lg:text-4xl">
                    <span className="text-red-400">{statusCode}</span> {statusText}
                </h1>
                <p className="mt-2 text-[#999]">{children}</p>
                <hr className="my-3 border-t-1 border-t-gray-200 dark:border-t-gray-700" />
                <p className="text-[#999]">
                    You can go back to the{" "}
                    <Link href="/" className="link">
                        homepage
                    </Link>
                    .
                </p>
            </main>
        </div>
    );
};

export default HTTPErrorView;
