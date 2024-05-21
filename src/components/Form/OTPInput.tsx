"use client";

import { useEffect, useRef, useState, type FC } from "react";
import Loop from "../Utils/Loop";
import OTPDigitInput from "./OTPDigitInput";

type OTPInputProps = {
    digits: number;
};

const OTPInput: FC<OTPInputProps> = ({ digits }) => {
    const [selectedInput, setSelectedInput] = useState(0);
    const valueRef = useRef<string[]>([]);

    useEffect(() => console.log(selectedInput), [selectedInput]);

    const onSubmit = () => {
        console.log("Submitted: ", valueRef.current);
    };

    return (
        <div className="flex items-center">
            <Loop times={digits}>
                {(index: number) => (
                    <OTPDigitInput
                        key={index}
                        value={valueRef.current[index] ?? ""}
                        selected={selectedInput === index}
                        onSelect={() => setSelectedInput(index)}
                        onNext={(input, done, digit) => {
                            if (digit) {
                                valueRef.current[index] = digit;
                            }

                            const isLast = index === digits - 1;

                            if (done || !isLast) {
                                setSelectedInput(isLast ? digits : index + 1);
                            }

                            if (isLast && done) {
                                input.blur();
                                onSubmit();
                            }
                        }}
                        onBack={(deleted) => {
                            if (deleted) {
                                valueRef.current[index] = "";
                            }

                            if (index === 0) {
                                return;
                            }

                            setSelectedInput(index - 1);
                        }}
                        onPaste={(input, text) => {
                            console.log("text", text);
                            const limit = digits - index;
                            const value = valueRef.current.slice(0, index).concat(text.slice(0, limit).split(""));
                            const initialLength = value.length;
                            value.push(...valueRef.current.slice(value.length - 1, limit));
                            valueRef.current = value;
                            setSelectedInput(initialLength);
                            input.blur();
                        }}
                        onDelete={() => {
                            const value = valueRef.current;
                            console.log("SLICE", value.slice(0, index + 1), value.slice(index + 1));
                            valueRef.current = value.slice(0, index + 1).concat(value.slice(index + 1));
                            const length = valueRef.current.length;
                            setSelectedInput((selected) => (index >= length ? length - 1 : selected));
                        }}
                    />
                )}
            </Loop>
        </div>
    );
};

export default OTPInput;
