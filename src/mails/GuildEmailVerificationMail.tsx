import "server-only";

import {
    Body,
    Container,
    Font,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Row,
    Tailwind,
    Text,
} from "@react-email/components";

type GuildEmailVerificationMailProps = {
    emailToken: string;
    email: string;
    token: string;
    guildName: string;
    ipAddress: string;
    geo?: {
        country: string;
        region?: string;
        city?: string;
    };
};

const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default function GuildEmailVerificationMail({
    email,
    emailToken,
    guildName,
    token,
    ipAddress,
    geo,
}: GuildEmailVerificationMailProps) {
    return (
        <Html lang="en">
            <Tailwind>
                <Head>
                    <Font
                        fontFamily="Inter"
                        fallbackFontFamily={["Arial", "sans-serif"]}
                        webFont={{
                            url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
                            format: "woff2",
                        }}
                    />
                </Head>
                <Body className="my-10 flex items-center justify-center bg-gray-100 lg:my-20">
                    <Container className="m-3 mx-auto w-96 rounded-lg bg-white px-4 pb-2 pt-3 shadow shadow-gray-600">
                        <Row>
                            <Img
                                src="cid:logo"
                                height={70}
                                width={70}
                                alt="SudoBot Logo"
                                className="mx-auto block size-[70px] rounded-full bg-gray-50 p-2"
                            />
                            <Heading className="text-center font-light">Verify Your Email</Heading>
                        </Row>
                        <Row>
                            <Text className="text-gray-600">
                                Hey!
                                <br />
                                <span className="block py-2"></span>
                                We have received a request to verify your email address{" "}
                                <Link href={`mailto:${email}`} className="text-blue-500 hover:text-blue-600">
                                    {email}
                                </Link>{" "}
                                to allow access to the Discord Server{" "}
                                <strong className="text-black">{guildName}</strong>. <br />
                                Click the button below to verify your email address.
                                <br />
                                If you didn&rsquo;t request a verification for the Discord Server{" "}
                                <strong className="text-black">{guildName}</strong>
                                , you can safely ignore this email.
                                <br />
                                <span className="block py-2"></span>
                                Sincerely,
                                <br />
                                <strong className="text-black">The SudoBot Team</strong>
                            </Text>
                        </Row>
                        <Row>
                            <Link
                                href={`${baseUrl}/challenge/email/complete?utm_source=email&utm_medium=button&addr=${encodeURIComponent(email)}&eml_token=${encodeURIComponent(emailToken)}&state=${encodeURIComponent(token)}`}
                                className="block rounded bg-black/90 px-4 py-2 text-center text-[18px] text-white hover:bg-black"
                            >
                                Verify Email
                            </Link>
                        </Row>
                        <Hr className="mt-5 border-t-gray-300" />
                        <Row>
                            <Text className="text-center text-xs text-gray-500">
                                If you have any questions, please contact us at{" "}
                                <Link href="mailto:support@sudobot.online">support@sudobot.online</Link>. We received this
                                verification request from the IP address <strong>{ipAddress}</strong>
                                {geo
                                    ? ` located in ${geo.city ? `${geo.city}, ` : ""}${geo.region ? `${geo.region}, ` : ""}${geo.country}`
                                    : ""}
                                .
                            </Text>
                        </Row>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
