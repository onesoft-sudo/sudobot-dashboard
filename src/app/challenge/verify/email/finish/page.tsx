import Card from "@/components/Verify/VerificationCard";
import VerificationHeading from "@/components/Verify/VerificationHeading";
import { ServerSideComponentProps } from "@/types/ServerSideComponentProps";
import { LinearProgress } from "@mui/material";
import { fetchInfo, getIconURL } from "../../page";

export default async function FinishVerificationByEmailPage({
    searchParams,
}: ServerSideComponentProps) {
    const [response, error] = await fetchInfo(searchParams);

    if (error) {
        return error;
    }

    const iconURL = getIconURL(response.data);
    const emailVerificationToken = searchParams["et"];

    return (
        <main className="flex flex-col justify-center items-center md:pt-[50px] pt-5">
            <VerificationHeading
                title="Verify By Email"
                iconURL={iconURL}
                guildId={response.data.guildId}
                guildName={response.data.guildName}
            />

            <Card>
                <div className="pt-3 bg-[#111]">
                    <h2 className="text-lg md:text-xl text-center">
                        Completing verification
                    </h2>
                    <p className="text-[#999] text-center">
                        Almost there. Hold on tight...
                    </p>
                    <br />
                    <LinearProgress />
                </div>
            </Card>
        </main>
    );
}
