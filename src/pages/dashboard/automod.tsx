import { Alert, Button, Card, CardContent, CardHeader, FormHelperText, MenuItem, TextField } from "@mui/material";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdRestore, MdSave } from "react-icons/md";
import { configGet, configUpdate } from "../../api/config";
import AIModCard from "../../components/AIModCard";
import ChannelSelect from "../../components/ChannelSelect";
import SpamFilterCard from "../../components/SpamFilterCard";
import Switch from "../../components/Switch";
import AuthContext, { useAuthContext } from "../../contexts/AuthContext";
import useAuthCheck from "../../hooks/useAuthCheck";
import useGuildChannels from "../../hooks/useGuildChannels";
import useResetForm from "../../hooks/useResetForm";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Channel } from "../../types/Channel";

export interface AutoModFormFields {
    'spam_filter.enabled': boolean;
    'spam_filter.limit': number;
    'spam_filter.time': number;
    'spam_filter.unmute_in': number;
    'ai_mod.enabled': boolean;
    'ai_mod.toxicity': number;
    'ai_mod.severe_toxicity': number;
    'ai_mod.threat': number;
}

export default function AutoMod() {
    useAuthCheck();

    const { formState: { errors: formErrors }, register, handleSubmit, reset } = useForm<AutoModFormFields>();
    const errors = formErrors as any;
    const [spamFilterData, setSpamFilterData] = useState({ limit: 0, time: 0, unmute_in: 0 });

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
            setSpamFilterData({ limit: data.data.spam_filter.limit, time: data.data.spam_filter.time, unmute_in: data.data.spam_filter.unmute_in })
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

    const resetForm = useResetForm(reset);

    const onSubmit = (data: any) => {
        const payload = {
            ...data,
            ai_mod: {
                ...data.ai_mod,
                toxicity: data.ai_mod.toxicity / 100,
                severe_toxicity: data.ai_mod.severe_toxicity / 100,
                threat: data.ai_mod.threat / 100,
            }
        };

        console.log(payload);
        mutation.mutate(payload);
    };

    useEffect(() => console.log(errors), [errors]);
    
    return (
        <div>
            <Head>
                <title>AutoMod Settings - SudoBot Dashboard</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-3 md:flex justify-between pr-4">
                    <h1>AutoModeration Settings</h1>

                    <div>
                        <Button disabled={mutation.isLoading} type="reset" onClick={resetForm as any} className="mr-2" startIcon={<MdRestore />}>Reset</Button>
                        <Button disabled={mutation.isLoading} type="submit" startIcon={<MdSave />}>Save</Button>
                    </div>
                </div>

                {mutation.isError && <Alert severity="error">An error has occurred while saving the settings.</Alert>}
                {mutation.isSuccess && <Alert severity="success">Successfully saved the settings.</Alert>}

                <br />

                {query.status === 'success' && channelQuery.status === 'success' && <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <SpamFilterCard
                        channels={channelQuery.data.data as Channel[]}
                        errors={errors}
                        register={register}
                        spamFilterData={query.data.data.spam_filter}
                    />

                    <AIModCard
                        errors={errors}
                        register={register}
                        aiModData={query.data.data.ai_mod}
                    />
                </div>}

                {query.isLoading && <h2>Loading...</h2>}
            </form>
        </div>
    );
}

AutoMod.layout = DashboardLayout;