import '../css/globals.css';
import type { AppProps as NextAppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';
import { NextComponentType, NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';

interface AppProps extends NextAppProps {
    Component: NextComponentType<NextPage, any, any> | any;
}

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

export default function App({ Component, pageProps }: AppProps) {
    return <ThemeProvider theme={theme}>
        {Component.layout ? 
            <Component.layout><Component {...pageProps} /></Component.layout> :
            <MainLayout><Component {...pageProps} /></MainLayout>}
    </ThemeProvider>;
}
