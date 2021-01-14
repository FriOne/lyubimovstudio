type Props = {
    stylesheets: string;
    scripts: string;
    title: string;
    initialData: any;
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
