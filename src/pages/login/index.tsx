import { Button, FormHelperText, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from 'react-icons/fa';
import { AuthContext, AuthContextAction } from "../../contexts/AuthContext";

type FormData = {
    username: string;
    password: string;
};

export default function Login() {
    const { formState: { errors }, register, handleSubmit } = useForm<FormData>();
    const { user, dispatch } = useContext(AuthContext);
    const router = useRouter();

    const onSubmit = (data: FormData) => {
        // hard code username and password for now
        if (data.username === 'root' && data.password === '1234') {
            console.log(data, user);

            dispatch({ 
                type: AuthContextAction.LOGIN, 
                payload: data
            });

            localStorage.setItem('user', `{
                username: 'root'
            }`);

            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-[80vh] flex justify-center items-center">
            <Head>
                <title>Login - SudoBot</title>
                <meta name="description" content='The ultimate solution for Discord Server Moderation.' />
            </Head>
            <div className="p-4 my-5 mx-2 md:mx-auto bg-[#222] md:w-[15%]">
                <h1 className="lg:text-4xl text-center">Login</h1>

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
                        <Button type="submit" variant="outlined" fullWidth={true}>Login</Button>
                        <br />
                        <br />
                        <Button type="button" style={{ color: '#7289da', borderColor: '#7289da' }} variant="outlined" fullWidth={true} startIcon={<FaDiscord />}>Login with Discord</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}