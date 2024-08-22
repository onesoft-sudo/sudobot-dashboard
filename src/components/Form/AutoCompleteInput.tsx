import clsx from "clsx";
import React, { ComponentProps, useRef } from "react";
import { MdClose } from "react-icons/md";

type AutoCompleteInputProps<T> = {
    onValueAdd: (value: string) => void;
    onValueRemove: (value: string) => void;
    setQuery: (value: string) => void;
    getId: (value: T) => string;
    query: string;
    values: T[];
    label: string;
    isFocused: boolean;
    onInputFocusChange: (isFocused: boolean) => void;
    renderItem?: (value: T) => React.ReactNode;
} & ComponentProps<"input">;

const AutoCompleteInput = <T,>({
    values,
    onValueAdd,
    onValueRemove,
    label,
    query,
    setQuery,
    isFocused,
    onInputFocusChange,
    renderItem,
    getId,
    ...props
}: AutoCompleteInputProps<T>) => {
    const ref = useRef<HTMLInputElement>(null);
    const isLabelFocused = isFocused || query.length > 0 || values.length > 0;

    const onBlur = (event: React.FocusEvent) => {
        if (!isFocused || event.currentTarget !== event.target) {
            return;
        }

        onInputFocusChange(false);
        ref.current?.blur();
        event.preventDefault();
        event.stopPropagation();
    };

    const onFocus = (event: React.FocusEvent) => {
        if (isFocused || event.currentTarget !== event.target) {
            return;
        }

        onInputFocusChange(true);
        ref.current?.focus();
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="transition-background relative flex cursor-text flex-col rounded-xl bg-zinc-800 p-2.5 hover:bg-zinc-700"
            tabIndex={0}
            onFocusCapture={onFocus}
            onBlurCapture={onBlur}
        >
            <div className="block pb-2"></div>
            <label
                className={clsx(
                    "absolute left-0 ml-2.5 select-none transition-all",
                    {
                        "text-sm text-neutral-400 top-1/2 -translate-y-1/2":
                            !isLabelFocused,
                        "mt-2 text-xs text-neutral-200 top-0": isLabelFocused,
                    },
                )}
            >
                {label}
            </label>
            <div
                className={clsx("flex flex-wrap items-baseline gap-1", {
                    "mt-3": values.length,
                })}
            >
                {values.map((value) => (
                    <div
                        key={getId(value)}
                        tabIndex={0}
                        onFocus={(event) => event.stopPropagation()}
                        onBlur={(event) => event.stopPropagation()}
                        className="z-50 flex items-center gap-1 rounded-full bg-neutral-600 px-2 py-1 text-xs text-neutral-300"
                    >
                        <span>{renderItem?.(value)}</span>
                        <MdClose
                            className="cursor-pointer rounded hover:bg-[rgba(255,255,255,0.2)]"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                onValueRemove(getId(value));
                            }}
                        />
                    </div>
                ))}

                <input
                    {...props}
                    ref={ref}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(event) => {
                        const value = event.target.value;

                        if (value.endsWith(" ")) {
                            onValueAdd(value.trim());
                        } else {
                            setQuery(value);
                        }

                        props.onChange?.(event);
                    }}
                    value={query}
                    className={clsx(
                        "min-w-[30px] border-0 bg-transparent text-[0.9rem] outline-none",
                        props.className,
                        {
                            "mt-2": !values.length,
                        },
                    )}
                    size={Math.max(query.length ?? 1, 6)}
                />
            </div>
        </div>
    );
};

export default AutoCompleteInput;
