"use client";

import { Dispatch, SetStateAction, useEffect, useState, type FC } from "react";
import Loop from "../Utils/Loop";
import OTPDigitInput from "./OTPDigitInput";

type OTPInputProps = {
    digits: number;
    onDone?: (value: string) => void;
};

const OTPInput: FC<OTPInputProps> = ({ digits, onDone }) => {
    const [selectedInput, setSelectedInput] = useState(0);
    const [value, setValue] = useState<string[]>(new Array(digits).fill("")) as [
        readonly string[],
        Dispatch<SetStateAction<string[]>>,
    ];

    useEffect(() => {
        if (value.every(Boolean)) {
            onDone?.(value.join(""));
        }
    }, [value, onDone]);

    return (
        <div className="flex items-center">
            <Loop times={digits}>
                {(index: number) => (
                    <OTPDigitInput
                        key={index}
                        value={value[index] ?? ""}
                        selected={selectedInput === index}
                        onSelect={() => setSelectedInput(index)}
                        invalid={!value[index] && !!value.at(-1)}
                        onNext={(input, done, digit) => {
                            if (digit) {
                                setValue((prev) => {
                                    const value = [...prev];
                                    value[index] = digit;
                                    return value;
                                });
                            }

                            const isLast = index === digits - 1;

                            if (done || !isLast) {
                                setSelectedInput(isLast ? digits : index + 1);
                            }

                            if (isLast && done) {
                                input.blur();
                            }
                        }}
                        onBack={(deleted) => {
                            if (deleted) {
                                setValue((prev) => {
                                    const value = [...prev];
                                    value[index] = "";
                                    return value;
                                });
                            }

                            if (index === 0) {
                                return;
                            }

                            setSelectedInput(index - 1);
                        }}
                        onPaste={(_, text) => {
                            if (text.length === digits) {
                                setValue(text.split(""));
                                setSelectedInput(digits);
                                return;
                            }

                            const limit = digits - index;
                            const paste = text.slice(0, limit).split("");
                            const keep = value.slice(0, index);
                            const rest = value.slice(keep.length + paste.length, digits);
                            const finalValue = keep.concat(paste, rest).slice(0, digits);

                            setValue(finalValue);
                            setSelectedInput(finalValue.length >= digits ? digits : finalValue.length);
                        }}
                        onDelete={() => {
                            if (index === 0 && !value[index]) {
                                return;
                            }

                            setValue((prev) => {
                                return prev.slice(0, index).concat(prev.slice(index + 1, digits));
                            });
                        }}
                    />
                )}
            </Loop>
        </div>
    );
};

export default OTPInput;
