import GuildEmailVerificationMail from "@/mails/GuildEmailVerificationMail";
import { render } from "@react-email/render";

export default function Page() {
    const emailHtml = render(
        GuildEmailVerificationMail({
            emailToken: "00",
            email: "rakinar2@onesoftnet.eu.org",
            guildName: "Private Server",
        }),
    );

    return (
        <div
            className="block min-h-screen w-full bg-white text-black"
            dangerouslySetInnerHTML={{
                __html: emailHtml,
            }}
        />
    );
}
