import { Alert, Button, Card, CardContent, FormHelperText, MenuItem, Select, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Switch from '../../components/Switch';
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdRestore, MdSave } from "react-icons/md";
import { configGet, configUpdate } from "../../api/config";
import { AuthContext, useAuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import useGuildRoles from "../../hooks/useGuildRoles";
import useGuildChannels from "../../hooks/useGuildChannels";
import UnsavedNotification from "../../components/UnsavedNotification";
import useAuthCheck from "../../hooks/useAuthCheck";

type BasicSettingsFormData = {
    prefix: string;
    debug: boolean;
    mod_role: string;
    admin: string;
    logging_channel: string;
    logging_channel_join_leave: string;
    logging_channel_boosts: string;
};

export default function BasicSettings() {
    useAuthCheck();

    const { formState: { errors, isDirty }, register, handleSubmit, reset } = useForm<BasicSettingsFormData>();
    const { user, guild } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const submitButtonRef = useRef<HTMLButtonElement | undefined>();

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

    const mutation = useMutation<any, any, BasicSettingsFormData>({
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

    const roleQuery = useGuildRoles(guild?.id, {
        enabled: !!user,
        queryKey: ['roles', guild?.id, user?.token],
        onSuccess(data) {
            console.log("Roles", data);
        },
    });

    const channelQuery = useGuildChannels(guild?.id, {
        enabled: !!user,
        onSuccess(data) {
            console.log("Channels", data);
        },
    });

    function onSubmit(data: BasicSettingsFormData) {
        console.log(data);
        mutation.mutate(data);
    }

    function resetForm(e: MouseEvent) {
        reset();
        (e.currentTarget! as any).disabled = true;
        location.reload();
    }

    useEffect(() => console.log("query.data?.data?.mod_role", query.data?.data?.mod_role), [query]);

    return (
        <div>
            <Head>
                <title>Basic Settings - SudoBot Dashboard</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-3 md:flex justify-between pr-4">
                    <h1>Basic Settings</h1>

                    <div>
                        <Button disabled={mutation.isLoading} type="reset" onClick={resetForm as any} className="mr-2" startIcon={<MdRestore />}>Reset</Button>
                        <Button disabled={mutation.isLoading} type="submit" ref={submitButtonRef as any} startIcon={<MdSave />}>{mutation.isLoading ? "Saving..." : "Save"}</Button>
                    </div>
                </div>

                {mutation.isError && <Alert severity="error">An error has occurred while saving the settings.</Alert>}
                {mutation.isSuccess && <Alert severity="success">Successfully saved the settings.</Alert>}

                {query.isFetched && channelQuery.isFetched && roleQuery.isFetched && <div className="grid grid-cols-1 md:grid-cols-3 my-3 gap-5">
                    <div>
                        <Card>
                            <CardContent>
                                <h2 className="pb-5">Bot Prefix</h2>

                                <TextField defaultValue={query.data?.data.prefix} label="Prefix" fullWidth={true} {...register("prefix", {
                                    required: true,
                                    validate(value) {
                                        return !value.includes(' ');
                                    }
                                })} />

                                {errors.prefix?.type === "required" && <FormHelperText style={{ color: '#f14a60' }}>Prefix cannot be empty!</FormHelperText>}
                                {errors.prefix?.type === "validate" && <FormHelperText style={{ color: '#f14a60' }}>Prefix cannot contain spaces!</FormHelperText>}
                            </CardContent>
                        </Card>

                        <br />

                        <Card>
                            <CardContent>
                                <div className="pb-3 flex justify-between items-center">
                                    <h2>Debug Mode</h2>
                                    <Switch defaultChecked={query.data?.data.debug ?? false} {...register("debug")} />
                                </div>

                                <p>When enabled, the bot will provide extra information about your server to the developers so that the developers can fix bugs/issues. This does not include any sensitive information.</p>
                            </CardContent>
                        </Card>
                    </div>
                    {roleQuery.isFetched && <div>
                        <Card>
                            <CardContent>
                                <h2 className="pb-5">Basic Permission Settings</h2>

                                <TextField select label="Moderator Role" id="modRole" style={{ color: '#fff' }} fullWidth={true} defaultValue={query.data?.data?.mod_role ?? ""} {...register("mod_role", { required: true })}>
                                    {roleQuery.data!.data.map((role: any) => (
                                        <MenuItem key={role.id} value={role.id}>{role.id === guild.id ? "@everyone (Everyone)" : `@${role.name}`}</MenuItem>
                                    ))}
                                </TextField>

                                <br />
                                <br />

                                <TextField select label="Admin Role" id="adminRole" style={{ color: '#fff' }} fullWidth={true} defaultValue={query.data?.data?.admin ?? ""} {...register("admin", { required: true })}>
                                    {roleQuery.data!.data.map((role: any) => (
                                        <MenuItem key={role.id} value={role.id}>{role.id === guild.id ? "@everyone (Everyone)" : `@${role.name}`}</MenuItem>
                                    ))}
                                </TextField>
                            </CardContent>
                        </Card>
                    </div>}

                    {channelQuery.isFetched && <div>
                        <Card>
                            <CardContent>
                                <h2 className="pb-5">Logging Settings</h2>

                                <TextField select id="loggingChannel" label="General Logging Channel" style={{ color: '#fff' }} fullWidth={true} defaultValue={query.data?.data?.logging_channel ?? ""} {...register("logging_channel", { required: true })}>
                                    {channelQuery.data!.data.filter((channel: any) => channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_NEWS').map((channel: any) => (
                                        <MenuItem key={channel.id} value={channel.id}>#{channel.name}</MenuItem>
                                    ))}
                                </TextField>

                                <br />
                                <br />

                                <TextField select id="loggingChannelJoinLeave" label="Join/Leave Logging Channel" style={{ color: '#fff' }} fullWidth={true} defaultValue={query.data?.data?.logging_channel_join_leave ?? ""} {...register("logging_channel_join_leave", { required: true })}>
                                    {channelQuery.data!.data.filter((channel: any) => channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_NEWS').map((channel: any) => (
                                        <MenuItem key={channel.id} value={channel.id}>#{channel.name}</MenuItem>
                                    ))}
                                </TextField>

                                <br />
                                <br />

                                <TextField select label="Boost Logging Channel" id="loggingChannelBoosts" style={{ color: '#fff' }} fullWidth={true} defaultValue={query.data?.data?.logging_channel_boosts ?? ""} {...register("logging_channel_boosts", { required: true })}>
                                    {channelQuery.data!.data.filter((channel: any) => channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_NEWS').map((channel: any) => (
                                        <MenuItem key={channel.id} value={channel.id}>#{channel.name}</MenuItem>
                                    ))}
                                </TextField>
                            </CardContent>
                        </Card>
                    </div>}

                    {roleQuery.isLoading && <div><h2>Loading...</h2></div>}
                    {roleQuery.isError && <div><Alert severity="error">An error has occurred while trying to load role information.</Alert></div>}
                </div>}

                {query.isLoading && <h2>Loading...</h2>}
                {query.isError && <h2>An error has occurred while loading this page.</h2>}
            </form>
        </div>
    );
}

BasicSettings.layout = DashboardLayout;