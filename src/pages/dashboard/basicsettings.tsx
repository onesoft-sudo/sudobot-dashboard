import { Alert, Button, Card, CardContent, FormHelperText, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Switch from '../../components/Switch';
import Head from "next/head";
import { useContext } from "react";
import { useForm, Validate, ValidateResult } from "react-hook-form";
import { MdSave } from "react-icons/md";
import { configGet, configUpdate } from "../../api/config";
import { AuthContext } from "../../contexts/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";

type BasicSettingsFormData = {
    prefix: string;
    debug: boolean;
};

const guildID = "911987536379912193";

export default function BasicSettings() {
    const { formState: { errors }, register, handleSubmit } = useForm<BasicSettingsFormData>();
    const { user } = useContext(AuthContext);

    const query = useQuery({
        enabled: !!user,
        queryKey: ["config", guildID, user?.token],
        queryFn: configGet,
        retry: 3,
        onSuccess(data) {
            console.log("config", data);
        },
    });

    const mutation = useMutation<any, any, BasicSettingsFormData>({
        mutationFn: variables => configUpdate({ token: user?.token, id: guildID }, variables as any),
        onSuccess(data, variables, context) {
            console.log(data);
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });

    function onSubmit(data: BasicSettingsFormData) {
        console.log(data);
        mutation.mutate(data);
    }

    return (
        <div>
            <Head>
                <title>Basic Settings - SudoBot Dashboard</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-3 flex justify-between pr-4">
                    <h1>Basic Settings</h1>

                    <Button disabled={mutation.isLoading} type="submit" startIcon={<MdSave />}>{mutation.isLoading ? "Saving..." : "Save"}</Button>
                </div>

                {mutation.isError && <Alert severity="error">An error has occurred while saving the settings.</Alert>}
                {mutation.isSuccess && <Alert severity="success">Successfully saved the settings.</Alert>}

                {query.isFetched && <div className="grid grid-cols-1 md:grid-cols-3 my-3 gap-5">
                    <Card>
                        <CardContent>
                            <h2 className="pb-3">Bot Prefix</h2>

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

                    <Card>
                        <CardContent>
                            <div className="pb-3 flex justify-between items-center">
                                <h2>Debug Mode</h2>
                                <Switch defaultChecked={query.data?.data.debug ?? false} />
                            </div>

                            <p>When enabled, the bot will provide extra information about your server to the developers so that the developers can fix bugs/issues. This does not include any sensitive information.</p>
                        </CardContent>
                    </Card>
                </div>}

                {query.isLoading && <h2>Loading...</h2>}
                {query.isError && <h2>An error has occurred while loading this page.</h2>}
            </form>
        </div>
    );
}

BasicSettings.layout = DashboardLayout;