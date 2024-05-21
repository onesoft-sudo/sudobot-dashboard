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
};

const OTPDigitInput: FC<OTPDigitInputProps> = ({
    onSelect,
    onNext,
    selected,
    onBack,
    onSelectAll,
    invalid = false,
    value,
    onPaste,
    onDelete,
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
            className={clsx(
                "size-12 border-y-1 border-r-1 border-zinc-700 text-center text-xl first:rounded-l-md first:border-l-1 last:rounded-r-md last:border-r-1 focus:border-2 focus:border-zinc-200 focus:outline-none",
                {
                    "border-red-500": invalid,
                },
            )}
            maxLength={1}
            onFocus={onSelect}
            ref={ref}
            placeholder={invalid ? "?" : ""}
            value={value}
            onChange={() => void 0}
            onKeyUp={(event) => {
                if (!ref.current) {
                    return;
                }

                if (event.key === "Backspace") {
                    ref.current.value = "";
                    onBack?.(true);
                } else if (event.key === "Delete") {
                    onDelete?.();
                } else if (event.key === "Enter") {
                    onNext?.(ref.current, true);
                } else if (event.key === "ArrowLeft") {
                    onBack?.();
                } else if (event.key === "ArrowRight") {
                    onNext?.(ref.current, false);
                } else if (event.ctrlKey && (event.key === "A" || event.key === "a")) {
                    onSelectAll?.();
                } else if (/^\d$/.test(event.key)) {
                    ref.current.value = event.key;
                    onNext?.(ref.current, true, ref.current.value);
                }
            }}
            onPaste={(event) => {
                event.preventDefault();

                if (!ref.current) {
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
