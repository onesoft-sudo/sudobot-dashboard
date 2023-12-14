import {
    Body,
    Button,
    Container,
    Font,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
} from "@react-email/components";
import { object, string, type Infer } from "superstruct";

export const TemplateName = "VerificationEmail";

export const TemplateStruct = object({
    email: string(),
    guild: string(),
    ip: string(),
    address: string(),
    verificationURL: string(),
});

export type TemplateProps = Infer<typeof TemplateStruct>;

export const Template = ({
    email,
    guild,
    address,
    ip,
    verificationURL,
}: TemplateProps) => (
    <Html>
        <Head>
            <Font
                fontFamily="Inter"
                fallbackFontFamily={["Verdana", "sans-serif"]}
                webFont={{
                    url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
                    format: "woff2",
                }}
                fontWeight={200}
                fontStyle="normal"
            />

            <Font
                fontFamily="Inter"
                fallbackFontFamily={["Verdana", "sans-serif"]}
                webFont={{
                    url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
        <Preview>Verify to continue to {guild}.</Preview>
        <Body
            style={{
                backgroundColor: "#eee",
            }}
        >
            <Container>
                <Section
                    style={{
                        marginTop: 10,
                        padding: 20,
                        backgroundColor: "#fff",
                        borderRadius: 5,
                        boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Img
                        src={"cid:logo"}
                        height={50}
                        width={50}
                        style={{
                            borderRadius: 5,
                            margin: "20px auto",
                        }}
                    />

                    <p
                        style={{
                            color: "#000",
                            fontSize: "25px",
                            margin: "0 auto",
                            padding: 0,
                            textAlign: "center",
                        }}
                    >
                        Verify to continue
                    </p>

                    <br />

                    <p
                        style={{
                            textAlign: "left",
                            color: "#000",
                            fontSize: "16px",
                        }}
                    >
                        Hello,
                        <br />
                        Please complete your email verification to continue to{" "}
                        <strong>{guild}</strong>, by clicking the button below:
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            style={{
                                padding: "10px 20px",
                                color: "#fff",
                                background: "#007bff",
                                borderRadius: 10,
                                margin: "10px auto",
                                textAlign: "center",
                                display: "block",
                                cursor: "pointer",
                                fontSize: 18,
                                textDecoration: "none",
                            }}
                            href={verificationURL}
                        >
                            Verify
                        </Button>
                    </div>

                    <p
                        style={{
                            textAlign: "left",
                            color: "#000",
                            fontSize: "16px",
                        }}
                    >
                        Alternatively, copy and paste the following URL in your
                        browser:
                        <br />
                        <Link href={verificationURL}>{verificationURL}</Link>
                        <br />
                        <br />
                        If you didn&rsquo;t intend to join{" "}
                        <strong>{guild}</strong> on Discord, then you can safely
                        ignore this email.
                        <br />
                        <br />
                        Sincerely,
                        <br />
                        <strong>{guild} Staff</strong>
                    </p>

                    <Hr
                        style={{
                            borderColor: "#e6ebf1",
                            margin: "20px 0",
                        }}
                    />

                    <p
                        style={{
                            color: "#999",
                            marginBottom: 0,
                            paddingBottom: 0,
                            fontSize: 13,
                        }}
                    >
                        This notification was sent to <strong>{email}</strong>.
                        We have received the verification request from{" "}
                        <strong>{ip}</strong>, located at{" "}
                        <strong>{address}</strong>.
                    </p>
                </Section>
            </Container>
        </Body>
    </Html>
);
