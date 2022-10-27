import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
    return <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet" />
        </Head>

        <div>
            <Main />
            <NextScript />
        </div>
    </Html>;
}