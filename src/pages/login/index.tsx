import { Alert, Button, FormHelperText, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from 'react-icons/fa';
import { login, LoginPayload } from "../../api/users";
import { AuthContext, AuthContextAction } from "../../contexts/AuthContext";

export default function Login() {
    const { formState: { errors }, register, handleSubmit } = useForm<LoginPayload>();
    const { dispatch } = useContext(AuthContext);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            router.push('/dashboard');
        }
    }, []);

    const mutation = useMutation({
        mutationFn: login,
        onError(error: AxiosError<any>) {
            console.log("Failure", error);
            setError(error.response?.data?.error ?? "There was an error while authenticating. Please try again.");

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = undefined;
            }

            timeoutRef.current = setTimeout(() => setError(null), 5000);
        },
        onSuccess(data, variables, context) {
            console.log(data);
            dispatch({ 
                type: AuthContextAction.LOGIN, 
                payload: data.data
            });

            localStorage.setItem('user', JSON.stringify(data.data));
            router.push(router.query.redirect_uri && router.query.redirect_uri.toString().startsWith('/') ? router.query.redirect_uri as string : '/dashboard');
        },
    });

    const onSubmit = (data: LoginPayload) => {
        setError(null);
        mutation.mutate(data);
    };

    useEffect(() => console.log(error), [error]);

    return (
        <div className="min-h-[80vh] flex justify-center items-center">
            <Head>
                <title>Login - SudoBot</title>
                <meta name="description" content='The ultimate solution for Discord Server Moderation.' />
            </Head>
            <div className="p-4 my-5 mx-2 md:mx-auto bg-[#222] md:w-[15%]">
                <h1 className="lg:text-4xl text-center">Login</h1>

                {mutation.isLoading && (
                    <Alert severity="info" className="mt-3">Authenticating...</Alert>
                )}

                {mutation.isSuccess && (
                    <Alert severity="success" className="mt-3">Login sucessful.</Alert>
                )}

                {error && (
                    <Alert severity="error" className="mt-3">{error}</Alert>
                )}

                <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                        variant="outlined" 
                        type="text" 
                        label="Username" 
                        fullWidth={true}
                        {...register("username", {
                            required: {
                                message: "Username is required!",
                                value: true
                            }
                        })}
                    />
                    {errors.username && (
                        <FormHelperText className="text-red-500">{errors.username.message}</FormHelperText>
                    )}

                    <br />
                    {!errors.username && <br />}

                    <TextField 
                        variant="outlined" 
                        type="password" 
                        label="Password" 
                        fullWidth={true}
                        {...register("password", {
                            required: {
                                message: "Password is required!",
                                value: true
                            }
                        })} 
                    />
                    {errors.password && (
                        <FormHelperText className="text-red-500">{errors.password.message}</FormHelperText>
                    )}
                    <FormHelperText className="text-gray-700"><a href="abcd">Forgot password?</a></FormHelperText>

                    <br />

                    <div>
                        <Button disabled={mutation.isLoading} type="submit" variant="outlined" fullWidth={true}>Login</Button>
                        <br />
                        <br />
                        <Button disabled={mutation.isLoading} type="button" style={{ color: '#7289da', borderColor: '#7289da' }} variant="outlined" fullWidth={true} startIcon={<FaDiscord />}>Login with Discord</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}