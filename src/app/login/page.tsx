import LoginForm from "@/components/Login/LoginForm";
import { Box } from "@mui/material";

export default function LoginPage() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-10 md:py-20">
            <h1 className="pb-10 text-center text-3xl md:pb-20 lg:text-4xl">Login</h1>

            <div className="relative mt-5 flex min-h-full w-full items-center justify-center">
                <Box className="mx-5 w-full rounded-lg bg-[linear-gradient(rgba(255,255,255,0.3),rgba(255,255,255,0.3))] p-3 shadow-[0_0_2px_0_rgba(0,0,0,0.17)] dark:bg-[linear-gradient(to_right,rgba(45,45,45,0.5),rgba(45,45,45,0.6))] dark:shadow-[0_0_2px_0_rgba(255,255,255,0.6)] sm:mx-0 sm:w-80 md:w-96">
                    <LoginForm />
                </Box>
            </div>
        </div>
    );
}
