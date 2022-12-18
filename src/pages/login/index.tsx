import { Button, FormHelperText, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type FormData = {
    username: string;
    password: string;
};

export default function Login() {
    const { formState: { errors }, register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="min-h-[80vh] flex justify-center items-center">
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

                    <div className="flex justify-end">
                        <Button type="submit" variant="outlined" className="ml-auto">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}