import { cx } from "@/utils/utils";
import { ComponentProps, FC } from "react";
import { MdArrowRight } from "react-icons/md";
import styles from "../../styles/VerificationMethod.module.css";

interface VerificationMethodProps extends ComponentProps<"a"> {
    name: string;
    description: string;
    icon: FC;
    disabled?: boolean;
    new?: boolean;
}

export default function VerificationMethod({
    name,
    description,
    icon: Icon,
    disabled = false,
    new: _new,
    onClick,
    ...props
}: VerificationMethodProps) {
    return (
        <a
            href="#"
            className={cx(
                {
                    [styles.disabled]: disabled,
                },
                styles.method
            )}
            onClick={disabled ? undefined : onClick}
            {...props}
        >
            <span>
                <h2 className="flex gap-2 items-center">
                    <span className="block p-1 bg-[#333] rounded-lg">
                        <Icon />
                    </span>{" "}
                    <span>{name}</span>
                    {disabled && (
                        <span className={styles.badge}>Unavailable</span>
                    )}
                    {_new && (
                        <span className={`${styles.badge} ${styles.new}`}>
                            New
                        </span>
                    )}
                </h2>
                <p>{description}</p>
            </span>
            <span>{!disabled && <MdArrowRight size={20} />}</span>
        </a>
    );
}
