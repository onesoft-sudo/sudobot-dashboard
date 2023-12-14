import Card from "@/components/Verify/VerificationCard";
import VerificationHeading from "@/components/Verify/VerificationHeading";
import { ServerSideComponentProps } from "@/types/ServerSideComponentProps";
import { Button, TextField } from "@mui/material";
import { fetchInfo, getIconURL } from "../page";
export { generateMetadata } from "../page";

export default async function VerifyByEmailPage({
    searchParams,
}: ServerSideComponentProps) {
    const [response, error] = await fetchInfo(searchParams);

    if (error) {
        return error;
    }

    const iconURL = getIconURL(response.data);

    return (
        <main className="flex flex-col justify-center items-center md:pt-[50px] pt-5">
            <VerificationHeading
                title="Verify By Email"
                iconURL={iconURL}
                guildId={response.data.guildId}
                guildName={response.data.guildName}
            />

            <Card>
                <div className="bg-[#222] pt-5 pb-3 px-3">
                    <TextField
                        label="Email Address"
                        placeholder="Enter your email"
                        fullWidth
                        type="email"
                    />

                    <div className="flex justify-end mt-3">
                        <Button>Next</Button>
                    </div>
                </div>
            </Card>
        </main>
    );
}
