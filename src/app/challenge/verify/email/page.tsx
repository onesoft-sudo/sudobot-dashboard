import EmailVerification from "@/components/Verify/EmailVerification";
import VerificationHeading from "@/components/Verify/VerificationHeading";
import { ServerSideComponentProps } from "@/types/ServerSideComponentProps";
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

            <EmailVerification />
        </main>
    );
}
