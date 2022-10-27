import '../css/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
});

export default function App({ Component, pageProps }: AppProps) {
    return <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>;
}
