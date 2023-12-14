import VerificationGuild, { VerificationGuildProps } from "./VerificationGuild";

interface VerificationHeadingProps extends VerificationGuildProps {
    title: string;
}

export default function VerificationHeading({
    title,
    ...props
}: VerificationHeadingProps) {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl text-center pt-5 md:pt-0 max-w-[95vw] whitespace-break-spaces">
                {title}
            </h1>
            <div className="text-center text-[#999] mt-3 flex items-center justify-center pt-3 pb-[20px] md:pb-[50px]">
                <p className="inline-block">to continue to</p>
                <VerificationGuild {...props} />
            </div>
        </div>
    );
}
