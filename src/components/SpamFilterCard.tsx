import { Card, CardContent, TextField, FormHelperText, Alert } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { AutoModFormFields } from "../pages/dashboard/automod";
import { Channel } from "../types/Channel";
import SettingsCardComponentProps from "../types/SettingsCardComponentProps";
import ChannelSelect from "./ChannelSelect";
import Switch from "./Switch";

interface SpamFilterCardProps extends SettingsCardComponentProps {
    spamFilterData: any;
    channels: Channel[];
}

export default function SpamFilterCard({ register, spamFilterData, errors, channels }: SpamFilterCardProps) {
    const [spamFilterState, setSpamFilterState] = useState({ limit: spamFilterData.limit, time: spamFilterData.time, unmute_in: spamFilterData.unmute_in });

    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between pl-2">
                    <h2>Spam Filter</h2>
                    <Switch defaultChecked={spamFilterData.enabled} {...register('spam_filter.enabled')} />
                </div>

                <br />

                <div className="md:flex items-center gap-3">
                    <TextField
                        fullWidth={true}
                        type="number"
                        label="Message Limit"
                        defaultValue={spamFilterData.limit}
                        {...register('spam_filter.limit', {
                            required: true,
                            valueAsNumber: true
                        })}
                        onBlur={e => setSpamFilterState(s => ({ ...s, limit: parseInt(e.target.value) }))}
                    />

                    <br className="md:hidden" />
                    <br className="md:hidden" />

                    <TextField
                        fullWidth={true}
                        type="number"
                        label="Timespan"
                        defaultValue={spamFilterData.time}
                        {...register('spam_filter.time', {
                            required: true,
                            valueAsNumber: true
                        })}
                        onBlur={e => setSpamFilterState(s => ({ ...s, time: parseInt(e.target.value) }))}
                    />

                </div>

                <FormHelperText>Users will be able to send {Number.isNaN(spamFilterState.limit) ? 0 : spamFilterState.limit} messages per {Number.isNaN(spamFilterState.time) ? 0 : spamFilterState.time} milliseconds.</FormHelperText>
                {(errors.spam_filter?.limit || errors.spam_filter?.time) && (
                    <FormHelperText className="text-red-500">{errors.spam_filter?.limit?.type === 'required' ? "Message Limit is required!" : (errors.spam_filter?.time?.type === 'required' ? "Timespan is required!" : "")}</FormHelperText>
                )}

                <br />

                <ChannelSelect
                    fullWidth={true}
                    data={channels}
                    variant="outlined"
                    label="Excluded Channels"
                    channelTypes={["GUILD_NEWS", "GUILD_CATEGORY", "GUILD_TEXT"]}
                    SelectProps={{
                        multiple: true,
                        defaultValue: spamFilterData.exclude
                    }} />

                <br />
                <br />

                <Alert severity="info">
                    If a user sends messages that exceed these limits, the bot will first send a warning message tagging the user in the channel. If the user continues, they'll get a DM warning. FInally, each violation after that will cause a mute.
                </Alert>

                <br />
                <br />

                <TextField
                    fullWidth={true}
                    type="number"
                    label="Spam Mute Duration"
                    defaultValue={spamFilterData.unmute_in}
                    {...register('spam_filter.unmute_in', {
                        required: true,
                        valueAsNumber: true
                    })}
                    onBlur={e => setSpamFilterState(s => ({ ...s, unmute_in: parseInt(e.target.value) }))}
                />

                <FormHelperText>Users will be muted for {spamFilterState.unmute_in} milliseconds ({formatDistanceToNowStrict(new Date(Date.now() + spamFilterState.unmute_in))}) if they spam again and again.</FormHelperText>

                {errors.spam_filter?.unmute_in?.type === 'required' && (
                    <FormHelperText className="text-red-500">Mute duration is required!</FormHelperText>
                )}
            </CardContent>
        </Card>
    );
}
