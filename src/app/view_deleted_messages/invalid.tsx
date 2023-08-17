import { Button } from "@mui/material";
import { FC } from "react";
import { MdError } from "react-icons/md";

interface InvalidProps {
    url?: string | string[];
    error?: boolean;
}

const Invalid: FC<InvalidProps> = ({ url, error }) => {
    return (
        <main className="flex justify-center items-center flex-col my-5 gap-3 text-red-600">
            <MdError size={40} />
            <div className="text-center text-2xl md:text-3xl">
                {!error ? (
                    <>{url ? "Invalid" : "No"} URL specified!</>
                ) : (
                    "An internal error has occurred."
                )}
            </div>

            <br />

            <div>
                <Button href="/" className="normal-case">
                    Return to Home
                </Button>
            </div>
        </main>
    );
};

export default Invalid;
