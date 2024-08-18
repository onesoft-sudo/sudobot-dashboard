import { Input } from "@nextui-org/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, useMemo, useRef, useState } from "react";
import { MdCheck } from "react-icons/md";

type AutoCompleteProps<T> = {
    data: T[];
    filter: (data: T, query: string) => boolean;
    onSelect: (data: Set<string>) => void;
    renderItem?: (data: T) => React.ReactNode;
    getId: (data: T) => string;
    props?: {
        input: ComponentProps<typeof Input>;
    };
};

const AutoComplete = <T,>({ data, props, filter, getId, onSelect }: AutoCompleteProps<T>) => {
    const [query, setQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [inputFocused, setInputFocused] = useState(false);
    const [itemsFocused, setItemsFocused] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const filteredData = useMemo(() => data.filter((item) => filter(item, query)), [data, query, filter]);
    const focused = inputFocused || itemsFocused;
    const listRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative">
            <Input
                {...props?.input}
                value={query}
                onValueChange={setQuery}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                        listRef.current?.focus();
                        event.currentTarget.blur();
                    }
                }}
            />

            <AnimatePresence>
                {focused && (
                    <motion.div
                        ref={listRef}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        tabIndex={0}
                        onFocus={() => setItemsFocused(true)}
                        onBlur={() => setItemsFocused(false)}
                        className="absolute z-[10000000] mt-2 block w-full rounded-lg bg-neutral-100 p-2 shadow outline-none dark:bg-[rgba(30,30,30,0.5)] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.25)]"
                        onKeyDown={(event) => {
                            if (
                                event.key === "ArrowDown" ||
                                event.key === "Tab" ||
                                event.key === "ArrowUp" ||
                                event.key === "Enter"
                            ) {
                                event.preventDefault();
                            }

                            if (event.key === "Enter" && focusedIndex !== null) {
                                props?.input.onBlur?.(event as any);

                                setSelectedItems((current) => {
                                    const id = getId(filteredData[focusedIndex]);

                                    if (current.has(id)) {
                                        current.delete(id);
                                    } else {
                                        current.add(id);
                                    }

                                    current = new Set(current);
                                    onSelect(current);
                                    return current;
                                });
                            }

                            if (event.key === "ArrowDown" || event.key === "Tab") {
                                setFocusedIndex((prev) =>
                                    prev === null || prev === filteredData.length - 1 ? 0 : prev + 1,
                                );
                            } else if (event.key === "ArrowUp") {
                                setFocusedIndex((prev) =>
                                    prev === null || prev === 0 ? filteredData.length - 1 : prev - 1,
                                );
                            }
                        }}
                    >
                        {filteredData.map((item, index) => (
                            <div
                                key={String(item)}
                                onClick={() => {
                                    setSelectedItems((current) => {
                                        const id = getId(item);

                                        if (current.has(id)) {
                                            current.delete(id);
                                        } else {
                                            current.add(id);
                                        }

                                        current = new Set(current);
                                        onSelect(current);
                                        return current;
                                    });
                                }}
                                className={clsx(
                                    "flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-sm outline-none hover:bg-neutral-200 dark:hover:bg-[rgba(255,255,255,0.1)]",
                                    {
                                        "bg-neutral-200 dark:bg-[rgba(255,255,255,0.1)]": focusedIndex === index,
                                    },
                                )}
                            >
                                <span>{String(item)}</span>
                                {selectedItems.has(getId(item)) && (
                                    <span className="text-primary-500 dark:text-primary-400">
                                        <MdCheck />
                                    </span>
                                )}
                            </div>
                        ))}
                        {filteredData.length === 0 && (
                            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                                No results found
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {focused && (
                <div
                    className="fixed left-0 top-0 z-[10000] size-full"
                    onClick={() => {
                        setInputFocused(false);
                        setItemsFocused(false);
                        setFocusedIndex(null);
                    }}
                />
            )}
        </div>
    );
};

export default AutoComplete;
