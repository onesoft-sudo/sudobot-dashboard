"use client";

import { GITHUB_REPO_URL, SUPPORT_EMAIL_ADDRESS } from "@/constants/links";
import { Select, SelectItem, Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useState, type FC } from "react";
import DMCAForm from "./DMCAForm";
import GeneralHelpForm from "./GeneralHelpForm";
import { SupportFormType } from "./SupportFormType";

type SupportFormProps = { form?: string };

const forms = {
    [SupportFormType.GenericHelp]: {
        name: "General Help",
        render: () => <GeneralHelpForm />,
    },
    [SupportFormType.LicensingLegalSupport]: {
        name: "Licensing & Legal Support",
        render: () => <p>Licensing & Legal Support</p>,
    },
    [SupportFormType.DMCA]: {
        name: "DMCA Takedown Request",
        render: () => <DMCAForm />,
    },
    [SupportFormType.BugReport]: {
        name: "Bug Report",
        render: () => null,
    },
};

const SupportForm: FC<SupportFormProps> = ({ form }) => {
    const [type, setType] = useState<SupportFormType | null>(() =>
        form && form in forms ? (form as SupportFormType) : null,
    );

    return (
        <div>
            <Select
                label="Category"
                name="category"
                defaultSelectedKeys={type ? [type] : []}
                onSelectionChange={(keys) =>
                    setType(
                        Array.from(
                            keys as unknown as Set<SupportFormType>,
                        )[0] || null,
                    )
                }
            >
                {Object.entries(forms).map(([key, { name }]) => (
                    <SelectItem key={key}>{name}</SelectItem>
                ))}
            </Select>

            {type && <Spacer y={5} />}

            {type === SupportFormType.BugReport && (
                <>
                    <p>
                        Please report bugs at our{" "}
                        <Link className="link" href={GITHUB_REPO_URL}>
                            GitHub repository
                        </Link>
                        .
                        <br />
                        If you&rsquo;re reporting a security issue, please
                        report it via email to{" "}
                        <a
                            href={`mailto:${SUPPORT_EMAIL_ADDRESS}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            {SUPPORT_EMAIL_ADDRESS}
                        </a>
                        .
                    </p>
                </>
            )}

            {type && forms[type].render()}
        </div>
    );
};

export default SupportForm;
