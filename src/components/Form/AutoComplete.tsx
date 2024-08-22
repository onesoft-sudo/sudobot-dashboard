import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, useMemo, useRef, useState } from "react";
import { MdCheck } from "react-icons/md";
import AutoCompleteInput from "./AutoCompleteInput";

type AutoCompleteProps<T> = {
    data: T[];
    filter: (data: T, query: string) => boolean;
    renderItem?: (data: T) => React.ReactNode;
    getId: (data: T) => string;
    findItemWithString: (items: T[], query: string) => T | undefined;
    selectedItems: Set<string>;
    setSelectedItems: (items: Set<string>) => void;
    errorMessage?: React.ReactNode;
    label: string;
    props?: {
        input: ComponentProps<"input">;
    };
};

const AutoComplete = <T,>({
    data,
    props,
    filter,
    getId,
    renderItem,
    findItemWithString,
    setSelectedItems: setSelectedItemKeys,
    selectedItems,
    errorMessage,
    label,
}: AutoCompleteProps<T>) => {
    const [query, setQuery] = useState("");
    const [inputFocused, setInputFocused] = useState(false);
    const [itemsFocused, setItemsFocused] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const filteredData = useMemo(
        () => data.filter((item) => filter(item, query)),
        [data, query, filter],
    );
    const focused = inputFocused || itemsFocused;
    const listRef = useRef<HTMLDivElement>(null);
    const selectedData = useMemo(
        () => data.filter((item) => selectedItems.has(getId(item))),
        [data, selectedItems, getId],
    );
    const setSelectedItems = (
        items: Set<string> | ((items: Set<string>) => Set<string>),
    ) => {
        if (typeof items === "function") {
            setSelectedItemKeys(items(selectedItems));
        } else {
            setSelectedItemKeys(items);
        }
    };

    return (
        <div className="relative">
            {" "}
            <AutoCompleteInput
                label={label}
                query={query}
                setQuery={setQuery}
                values={selectedData}
                getId={getId}
                isFocused={focused}
                onInputFocusChange={setInputFocused}
                renderItem={renderItem}
                onValueAdd={(value) => {
                    const item = findItemWithString(filteredData, query);

                    if (!item) {
                        return;
                    }

                    const id = getId(item);

                    if (selectedItems.has(id)) {
                        return;
                    }

                    setQuery("");
                    setSelectedItems((current) => {
                        current.add(id);
                        current = new Set(current);
                        return current;
                    });
                }}
                onValueRemove={(value) => {
                    setSelectedItems((current) => {
                        current.delete(value);
                        current = new Set(current);
                        return current;
                    });
                }}
                onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                        listRef.current?.focus();
                        event.currentTarget.blur();
                    }

                    if (event.key === "Enter") {
                        setSelectedItems((current) => {
                            if (!filteredData[focusedIndex ?? 0]) {
                                return current;
                            }

                            const id = getId(filteredData[focusedIndex ?? 0]);

                            if (!id || current.has(id)) {
                                return current;
                            }

                            current.add(id);
                            current = new Set(current);
                            setQuery("");
                            return current;
                        });
                    }

                    if (event.key === "Backspace" && query === "") {
                        setSelectedItems((current) => {
                            const id = Array.from(current).pop();

                            if (id) {
                                current.delete(id);
                            }

                            current = new Set(current);
                            return current;
                        });
                    }
                }}
                {...props?.input}
            />
            {errorMessage && (
                <div className="text-sm text-red-500 dark:text-red-400">
                    {errorMessage}
                </div>
            )}
            <AnimatePresence>
                {focused && (
                    <motion.div
                        ref={listRef}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        tabIndex={0}
                        onFocus={() => {
                            setItemsFocused(true);
                            setFocusedIndex(0);
                        }}
                        onBlur={() => setItemsFocused(false)}
                        className="absolute z-[1000000000] mt-2 block max-h-40 w-full overflow-y-scroll rounded-lg bg-neutral-100 p-2 shadow outline-none backdrop-blur-lg dark:bg-[rgba(30,30,30,0.5)] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.25)]"
                        onKeyDown={(event) => {
                            if (
                                event.key === "ArrowDown" ||
                                event.key === "Tab" ||
                                event.key === "ArrowUp" ||
                                event.key === "Enter"
                            ) {
                                event.preventDefault();
                            }

                            if (
                                event.key === "Enter" &&
                                focusedIndex !== null
                            ) {
                                props?.input.onBlur?.(event as any);

                                setSelectedItems((current) => {
                                    const id = getId(
                                        filteredData[focusedIndex],
                                    );

                                    if (current.has(id)) {
                                        current.delete(id);
                                    } else {
                                        current.add(id);
                                    }

                                    current = new Set(current);
                                    return current;
                                });
                            }

                            if (
                                event.key === "ArrowDown" ||
                                (event.key === "Tab" && !event.shiftKey)
                            ) {
                                setFocusedIndex((prev) =>
                                    prev === null ||
                                    prev === filteredData.length - 1
                                        ? 0
                                        : prev + 1,
                                );
                            } else if (
                                event.key === "ArrowUp" ||
                                (event.key === "Tab" && event.shiftKey)
                            ) {
                                setFocusedIndex((prev) =>
                                    prev === null || prev === 0
                                        ? filteredData.length - 1
                                        : prev - 1,
                                );
                            }
                        }}
                    >
                        {filteredData.map((item, index) => (
                            <div
                                key={getId(item)}
                                onClick={() => {
                                    setSelectedItems((current) => {
                                        const id = getId(item);

                                        if (current.has(id)) {
                                            current.delete(id);
                                        } else {
                                            current.add(id);
                                        }

                                        current = new Set(current);
                                        return current;
                                    });
                                }}
                                className={clsx(
                                    "my-1.5 flex cursor-pointer items-center justify-between rounded-lg p-1.5 text-sm outline-none first:mt-0 last:mb-0 hover:bg-neutral-200 dark:hover:bg-[rgba(255,255,255,0.1)]",
                                    {
                                        "bg-neutral-200 dark:bg-[rgba(255,255,255,0.1)]":
                                            focusedIndex === index,
                                    },
                                )}
                            >
                                <span>{renderItem?.(item)}</span>
                                {selectedItems.has(getId(item)) && (
                                    <span className="text-lg text-neutral-800 dark:text-neutral-100">
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
