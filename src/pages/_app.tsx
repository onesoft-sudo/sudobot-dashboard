import '../css/globals.css';
import type { AppProps as NextAppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';
import { NextComponentType, NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';
import { theme } from '../utils/theme';
import AuthContextProvider from '../contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface AppProps extends NextAppProps {
    Component: NextComponentType<NextPage, any, any> | any;
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    {Component.layout ? 
                        <Component.layout><Component {...pageProps} /></Component.layout> :
                            <MainLayout><Component {...pageProps} /></MainLayout>}
                </AuthContextProvider>
            </ThemeProvider>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
