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
    guildName: string;
};

const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default function GuildEmailVerificationMail({ email, emailToken, guildName }: GuildEmailVerificationMailProps) {
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
                                src={"cid:logo"}
                                height={50}
                                width={50}
                                alt="SudoBot Logo"
                                className="mx-auto block size-12 rounded-full bg-gray-50 p-2 shadow-md"
                            />
                            <Heading className="text-center font-light">Verify Your Email</Heading>
                        </Row>
                        <Row>
                            <Text className="text-gray-600">
                                Hello!
                                <br />
                                <span className="block py-2"></span>
                                Click the button below to verify your email address{" "}
                                <Link href={`mailto:${email}`} className="text-blue-500 hover:text-blue-600">
                                    {email}
                                </Link>{" "}
                                and continue to <strong className="text-black">{guildName}</strong>
                                . <br />
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
                                href={`${baseUrl}/challenge/email/complete?utm_source=email&utm_medium=button&eml_token=${emailToken}`}
                                className="block rounded bg-black/90 px-4 py-2 text-center text-white hover:bg-black"
                            >
                                Verify Email
                            </Link>
                        </Row>
                        <Hr className="mt-5 border-t-gray-300" />
                        <Row>
                            <Text className="text-center text-xs text-gray-500">
                                If you have any questions, please contact us at{" "}
                                <Link href="mailto:support@sudobot.org">support@sudobot.org</Link>. You are receiving
                                this email because we have received a request to verify the email address to allow
                                access to the Discord Server <strong className="text-black">{guildName}</strong>.
                            </Text>
                        </Row>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
