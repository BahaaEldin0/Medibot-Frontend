import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    content="Medibot Medical AI Doctor"
                    name="Medibot"
                />
                <meta content="Medibot - " property="og:title" />
                <meta
                    content="Medical AI Doctor Assistant"
                    property="og:description"
                />
                <meta
                    content="%PUBLIC_URL%/fb-og-image.png"
                    property="og:image"
                />
                
                <meta property="og:site_name" content="Medibot - Medical AI Assistant" />
                <meta
                    content="Medibot - Medical AI Assistant"
                    property="twitter:title"
                />
               
                <meta
                    content="%PUBLIC_URL%/twitter-card.png"
                    property="twitter:image"
                />
                <meta property="og:type" content="Article" />
                <meta content="summary" name="twitter:card" />
                <meta name="twitter:site" content="@ui8" />
                <meta name="twitter:creator" content="@ui8" />
                <meta property="fb:admins" content="132951670226590" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />

                {/* Add Favicon */}
                {/* we are in the Pages Folder while The image is in Public Folder */}
                
                <link rel="icon" href="/favicon.png" />



            
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
