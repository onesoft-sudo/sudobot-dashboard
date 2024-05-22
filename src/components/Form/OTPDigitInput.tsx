import clsx from "clsx";
import { useEffect, useRef, type FC } from "react";

type OTPDigitInputProps = {
    onNext?: (input: HTMLInputElement, done: boolean, value?: string) => void;
    onSelect?: () => void;
    onBack?: (deleted?: boolean) => void;
    onSelectAll?: () => void;
    onDelete?: () => void;
    onPaste?: (input: HTMLInputElement, text: string) => void;
    selected: boolean;
    invalid?: boolean;
    value: string;
    autoFocus?: boolean;
    disabled?: boolean;
};

const OTPDigitInput: FC<OTPDigitInputProps> = ({
    onSelect,
    onNext,
    selected,
    onBack,
    onSelectAll,
    onPaste,
    onDelete,
    invalid = false,
    autoFocus = false,
    disabled = false,
    value,
}) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selected && ref.current) {
            ref.current.focus();
        }
    }, [selected]);

    return (
        <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoFocus={autoFocus}
            maxLength={1}
            onFocus={onSelect}
            ref={ref}
            placeholder={invalid ? "!" : ""}
            value={value}
            className={clsx(
                "size-12 border-y-1 border-r-1 text-center text-xl placeholder:text-orange-700 first:rounded-l-md first:border-l-1 last:rounded-r-md last:border-r-1 read-only:bg-[rgba(0,0,0,0.04)] focus:border-2 focus:outline-none focus:placeholder:text-transparent dark:read-only:bg-[rgba(255,255,255,0.15)]",
                {
                    "border-orange-700 focus:border-red-500 border-l": invalid,
                    "border-zinc-300/80 dark:border-zinc-700 focus:border-zinc-700 dark:focus:border-zinc-200":
                        !invalid,
                },
            )}
            readOnly={disabled}
            onChange={() => void 0}
            onKeyUp={(event) => {
                if (!ref.current) {
                    return;
                }

                if (event.key === "Backspace" && !disabled) {
                    ref.current.value = "";
                    onBack?.(true);
                } else if (event.key === "Delete" && !disabled) {
                    onDelete?.();
                } else if (event.key === "Enter" && !disabled) {
                    onNext?.(ref.current, true);
                } else if (event.key === "ArrowLeft") {
                    onBack?.();
                } else if (event.key === "ArrowRight") {
                    onNext?.(ref.current, false);
                } else if (event.ctrlKey && (event.key === "A" || event.key === "a") && !disabled) {
                    onSelectAll?.();
                } else if (/^\d$/.test(event.key) && !disabled) {
                    ref.current.value = event.key;
                    onNext?.(ref.current, true, event.key);
                }
            }}
            onPaste={(event) => {
                event.preventDefault();

                if (!ref.current || disabled) {
                    return;
                }

                const text = event.clipboardData.getData("text");

                if (onPaste && /^\d+$/.test(text)) {
                    onPaste(ref.current, text);
                }
            }}
        />
    );
};

export default OTPDigitInput;
