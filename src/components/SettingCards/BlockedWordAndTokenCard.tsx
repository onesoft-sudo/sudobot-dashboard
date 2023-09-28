import useTogglableState from "@/hooks/useTogglableState";
import { SettingCardProps } from "@/types/SetttingCardProps";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC, useState } from "react";
import Switch from "../Common/Switch";

const BlockedWordAndTokenCard: FC<SettingCardProps> = ({
    register,
    errors,
    data: { config },
    setError,
    clearErrors,
    setValue,
}) => {
    const [state, setState] = useState(() => ({
        enabled: !!config?.message_filter?.enabled,
        send_logs: !!config?.message_filter?.send_logs,
        delete_message: !!config?.message_filter?.delete_message,
    }));
    const [selectedWords, setSelectedWords] = useState<any[]>(
        config?.message_filter?.data?.blocked_words ?? []
    );
    const [selectedTokens, setSelectedTokens] = useState<any[]>(
        config?.message_filter?.data?.blocked_tokens ?? []
    );
    const [showExplanation, toggleExplanation] = useTogglableState(false);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between w-[100%] relative">
                    <h4 className="font-bold text-large pl-2">
                        Blocked Words & Tokens
                    </h4>
                    <div>
                        <Switch
                            defaultChecked={!!config?.message_filter?.enabled}
                            {...register("message_filter.enabled", {
                                onChange() {
                                    setState(s => ({
                                        ...s,
                                        enabled: !s.enabled,
                                    }));
                                },
                            })}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody>
                <p className="pb-6">
                    Block specific words or tokens.{" "}
                    <a
                        href="#"
                        className="link"
                        onClick={() => toggleExplanation()}
                    >
                        What are the difference between a token and a word?
                    </a>
                </p>
                <div className="relative w-[100%]">
                    {showExplanation && (
                        <div className="bg-[#232323] p-5 rounded-lg max-w-[100%] h-[500px] overflow-y-scroll">
                            A word is just a collection of characters (letters).
                            Words cannot contain spaces.
                            <br />
                            A token can contain spaces. It will be searched
                            universally in messages, and if it&rsquo;s found
                            anywhere in the message, the bot will take action.
                            <br />
                            Whereas, for blocked words, the bot will only take
                            action if a blocked word is found in the message and
                            is separated by space(s).
                            <br />
                            <br />
                            For example, if &ldquo;lol&rdquo; and
                            &ldquo;lmao&rdquo; were added as blocked{" "}
                            <strong className="text-bold">words</strong>, the
                            following messages will trigger the filter:
                            <br />
                            <ul className="list-disc pl-5 py-3">
                                <li>lol</li>
                                <li>lmao</li>
                                <li>lmao what is this</li>
                                <li>what lmao i laughed so hard</li>
                                <li>what lmao i laughed so hard lol</li>
                            </ul>
                            The following won&rsquo;t trigger the filter:
                            <br />
                            <ul className="list-disc pl-5 py-3">
                                <li>lo l</li>
                                <li>l m a o</li>
                                <li>hello</li>
                                <li>what is this</li>
                                <li>what lmao-i laughed so hard</li>
                                <li>lmaowhatisthis</li>
                            </ul>
                            <br />
                            However, if &ldquo;lol&rdquo; and &ldquo;lmao&rdquo;
                            were added as blocked{" "}
                            <strong className="text-bold">tokens</strong>, the
                            following messages will trigger the filter:
                            <br />
                            <ul className="list-disc pl-5 py-3">
                                <li>lol</li>
                                <li>lmao</li>
                                <li>lmao what is this</li>
                                <li>what lmao i laughed so hard</li>
                                <li>what lmao i laughed so hard lol</li>
                                <li>what lmao-i laughed so hard</li>
                                <li>lmaowhatisthis</li>
                            </ul>
                            The following won&rsquo;t trigger the filter:
                            <br />
                            <ul className="list-disc pl-5 py-3">
                                <li>lo l</li>
                                <li>l m a o</li>
                                <li>hello</li>
                                <li>what is this</li>
                            </ul>
                            <br />
                        </div>
                    )}
                </div>

                {state.enabled && (
                    <>
                        <Autocomplete
                            options={[]}
                            freeSolo
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option}>
                                        {option}
                                    </li>
                                );
                            }}
                            value={selectedWords}
                            multiple={true}
                            renderInput={params => (
                                <TextField {...params} label="Blocked words" />
                            )}
                            {...register("message_filter.data.blocked_words", {
                                value: selectedWords,
                            })}
                            onChange={(_, selectedValues) => {
                                const values = [];

                                for (const value of selectedValues) {
                                    const splitted = value.split(/\s+/);
                                    values.push(...splitted);
                                }

                                console.log(values);

                                setSelectedWords(values as any);

                                for (const value of values) {
                                    if (value.includes(" ")) {
                                        setError(
                                            "message_filter.data.blocked_words",
                                            {
                                                message:
                                                    "Blocked word entries cannot include spaces!",
                                            }
                                        );

                                        return;
                                    }
                                }

                                if (
                                    (errors as any)?.message_filter?.data
                                        ?.blocked_words
                                ) {
                                    console.log("Errors cleared");
                                    clearErrors(
                                        "message_filter.data.blocked_words"
                                    );
                                }

                                setValue(
                                    "message_filter.data.blocked_words",
                                    values,
                                    {
                                        shouldValidate: false,
                                        shouldTouch: true,
                                    }
                                );
                            }}
                        />
                        {(errors as any)?.message_filter?.data
                            ?.blocked_words ? (
                            <FormHelperText>
                                <span className="text-red-600">
                                    {(
                                        errors as any
                                    )?.message_filter?.data?.blocked_words.message?.toString() ??
                                        ""}
                                </span>
                            </FormHelperText>
                        ) : undefined}
                        <FormHelperText>
                            <span className="text-[#999]">
                                Don&rsquo;t forget to hit enter when you finish
                                typing a word!
                            </span>
                        </FormHelperText>

                        <div className="pt-4"></div>

                        <Autocomplete
                            options={[]}
                            freeSolo
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option}>
                                        {option}
                                    </li>
                                );
                            }}
                            value={selectedTokens}
                            multiple={true}
                            renderInput={params => (
                                <TextField {...params} label="Blocked tokens" />
                            )}
                            {...register("message_filter.data.blocked_tokens", {
                                value: selectedTokens,
                            })}
                            onChange={(_, selectedValues) => {
                                const values = selectedValues.map(v =>
                                    v.trim()
                                );
                                console.log(values);

                                setSelectedTokens(values as any);

                                setValue(
                                    "message_filter.data.blocked_tokens",
                                    values,
                                    {
                                        shouldValidate: false,
                                        shouldTouch: true,
                                    }
                                );
                            }}
                        />
                        {(errors as any)?.message_filter?.data
                            ?.blocked_tokens ? (
                            <FormHelperText>
                                <span className="text-red-600">
                                    {(
                                        errors as any
                                    )?.message_filter?.data?.blocked_tokens.message?.toString() ??
                                        ""}
                                </span>
                            </FormHelperText>
                        ) : undefined}
                        <FormHelperText>
                            <span className="text-[#999]">
                                Don&rsquo;t forget to hit enter when you finish
                                typing a token!
                            </span>
                        </FormHelperText>

                        <div className="flex justify-between items-center pt-3">
                            <label>
                                Delete messages
                                <span className="text-xs block text-[#999]">
                                    If any of these blocked words/tokens were
                                    found
                                </span>
                            </label>
                            <div>
                                <Switch
                                    className="-mr-2"
                                    defaultChecked={
                                        !!config?.message_filter?.delete_message
                                    }
                                    {...register(
                                        "message_filter.delete_message",
                                        {
                                            onChange() {
                                                setState(s => ({
                                                    ...s,
                                                    delete_message:
                                                        !s.delete_message,
                                                }));
                                            },
                                        }
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-3">
                            <label>Send logs</label>
                            <div>
                                <Switch
                                    className="-mr-2"
                                    defaultChecked={
                                        !!config?.message_filter?.send_logs
                                    }
                                    {...register("message_filter.send_logs", {
                                        onChange() {
                                            setState(s => ({
                                                ...s,
                                                send_logs: !s.send_logs,
                                            }));
                                        },
                                    })}
                                />
                            </div>
                        </div>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default BlockedWordAndTokenCard;
