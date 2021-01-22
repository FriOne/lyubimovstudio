type Props = {
    stylesheets: string;
    scripts: string;
    title: string;
    initialData: unknown;
};

export function getHtmlPageStartAndEnd(props: Props) {
    const { scripts, stylesheets, title, initialData } = props;
    const initialDataScript = initialData
        ? `<script>window.__initialData__ = ${JSON.stringify(initialData)}</script>`
        : '';

    return [`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charSet="UTF-8" />
                <base href="/">
                <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <link rel="apple-touch-icon" href="/assets/icons/icon-192x192.png">
                <link rel="manifest" href="/manifest.webmanifest">
                <meta name="theme-color" content="#2c2c2c">
                <title>${title}</title>
                <style>html { display: none; }</style>
                ${stylesheets}
            </head>
            <body>
                <div id="root">
    `,
    `
                </div>
                ${initialDataScript}
                ${scripts}
            </body>
        </html>
    `];
}
