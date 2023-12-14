import Image from "next/image";

export interface VerificationGuildProps {
    guildId: string;
    guildName: string;
    iconURL?: string | null;
}

export default function VerificationGuild({
    guildId,
    iconURL,
    guildName,
}: VerificationGuildProps) {
    return (
        <a
            href={`https://discord.com/channels/${encodeURIComponent(guildId)}`}
            target="_blank"
            rel="noreferrer"
            className="no-underline text-[#007bff] font-bold ml-3 inline-flex justify-center items-center gap-2 bg-[rgba(0,123,255,0.25)] px-2 py-1 rounded-lg"
        >
            {iconURL && (
                <Image
                    src={iconURL}
                    alt="[icon]"
                    height={20}
                    width={20}
                    style={{
                        borderRadius: "50%",
                    }}
                />
            )}

            <h2>{guildName}</h2>
        </a>
    );
}
