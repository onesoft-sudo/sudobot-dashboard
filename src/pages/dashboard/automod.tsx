import { Card, CardContent, CardHeader, FormHelperText, MenuItem, TextField } from "@mui/material";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { configGet, configUpdate } from "../../api/config";
import ChannelSelect from "../../components/ChannelSelect";
import Switch from "../../components/Switch";
import AuthContext, { useAuthContext } from "../../contexts/AuthContext";
import useAuthCheck from "../../hooks/useAuthCheck";
import useGuildChannels from "../../hooks/useGuildChannels";
import DashboardLayout from "../../layouts/DashboardLayout";

interface AutoModFormFields {
    'spam_filter.enabled': boolean,
    'spam_filter.limit': number,
    'spam_filter.time': number,
}

export default function AutoMod() {
    useAuthCheck();

    const { formState: { errors }, getValues, register, handleSubmit, watch } = useForm<AutoModFormFields>();

    const { user, guild } = useAuthContext();
    const queryClient = useQueryClient();

    const query = useQuery({
        enabled: !!user,
        queryKey: ["config", guild?.id, user?.token],
        queryFn: configGet,
        retry: 3,
        refetchOnWindowFocus: false,
        staleTime: 1,
        onSuccess(data) {
            console.log("config", data);
        },
    });
    
    const channelQuery = useGuildChannels(guild?.id, {
        enabled: !!user,
        onSuccess(data) {
            console.log("Channels", data);
        },
    });

    const mutation = useMutation<any, any, AutoModFormFields>({
        mutationFn: variables => configUpdate({ token: user?.token, id: guild?.id }, variables as any),
        onSuccess(data, variables, context) {
            console.log(data);

            queryClient.invalidateQueries({
                queryKey: ["config", guild?.id, user?.token]
            });
        },
        onError(error, variables, context) {
            console.log(error);
        },
        onSettled() {
            setTimeout(() => mutation.reset(), 5000);
        }
    });

    const onSubmit = (data: AutoModFormFields) => {

    };
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>AutoModeration Settings</h1>

                <br />

                {query.status === 'success' && channelQuery.status === 'success' && <div className="grid grid-cols-3 gap-5">
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between pl-2">
                                <h2>Spam Filter</h2>
                                <Switch defaultChecked={query.data?.data?.spam_filter.enabled} {...register('spam_filter.enabled')} />
                            </div>

                            <br />

                            <div className="md:flex items-center gap-3">
                                <TextField
                                    fullWidth={true}
                                    type="number"
                                    label="Message Limit"
                                    defaultValue={query.data?.data?.spam_filter.limit}
                                    {...register('spam_filter.limit', {
                                        required: true,
                                        valueAsNumber: true
                                    })}
                                />

                                <br className="md:hidden" />

                                <TextField
                                    fullWidth={true}
                                    type="number"
                                    label="Timespan"
                                    defaultValue={query.data?.data?.spam_filter.time}
                                    {...register('spam_filter.time', {
                                        required: true,
                                        valueAsNumber: true
                                    })}
                                />

                            </div>

                            <FormHelperText>Users will be able to send {getValues('spam_filter.limit')} messages per {getValues('spam_filter.time')} milliseconds.</FormHelperText>

                            <br />

                            <ChannelSelect 
                                fullWidth={true}
                                data={channelQuery.data.data} 
                                variant="outlined"
                                label="Excluded Channels"
                                channelTypes={["GUILD_NEWS", "GUILD_CATEGORY", "GUILD_TEXT"]}
                                SelectProps={{
                                    multiple: true,
                                    defaultValue: query.data.data.spam_filter.exclude
                                }} />
                        </CardContent>
                    </Card>
                </div>}

                {query.isLoading && <h2>Loading...</h2>}
            </form>
        </div>
    );
}

AutoMod.layout = DashboardLayout;