import { usePreviousValue } from "@/hooks/utils";
import Image from "next/image";
import { ComponentProps, useState, type FC } from "react";
import { MdQuestionMark } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type IconProps = Omit<ComponentProps<typeof Image>, "src"> & {
    src?: string;
    iconSize?: number;
};

const Icon: FC<IconProps> = ({ src, alt, iconSize, className, onError, onAbort, onLoad, ...props }) => {
    const [isError, setIsError] = useState(false);
    const previousSrc = usePreviousValue(src);
    const isFinalError = isError && previousSrc === src;

    return (
        <>
            {src && !isFinalError ? (
                <Image
                    src={src}
                    alt={alt}
                    onError={(error) => {
                        if (!isError) {
                            setIsError(true);
                        }

                        onError?.(error);
                    }}
                    onAbort={(error) => {
                        if (!isError) {
                            setIsError(true);
                        }

                        onAbort?.(error);
                    }}
                    onLoad={(event) => {
                        if (isError) {
                            setIsError(false);
                        }

                        onLoad?.(event);
                    }}
                    className={twMerge("rounded-full", className, isError ? "hidden" : "")}
                    {...props}
                />
            ) : (
                <MdQuestionMark
                    size={iconSize}
                    style={props.style}
                    className={twMerge(
                        "rounded-full object-cover p-1 border-1 border-[#999] dark:border-[#555] bg-[#ddd] dark:bg-[#222]",
                        className,
                    )}
                />
            )}
        </>
    );
};

export default Icon;
