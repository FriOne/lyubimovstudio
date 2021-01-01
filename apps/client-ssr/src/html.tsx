import { HelmetData } from 'react-helmet';

type Props = {
    helmet: HelmetData;
    stylesheets: string;
    scripts: string;
    children: string;
    initialData: any;
};

export function getHtml(props: Props) {
    const { children, scripts, stylesheets, helmet, initialData } = props;
    const initialDataScript = initialData
        ? `<script>window.__initialData__ = ${JSON.stringify(initialData)}</script>`
        : '';

    return `
        <html>
            <head>
                <meta charSet="UTF-8" />
                <base href="/">
                <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <style>html { display: none; }</style>
                ${stylesheets}
            </head>
            <body>
                <div id="root">
                    ${children}
                </div>
                ${initialDataScript}
                ${scripts}
            </body>
        </html>
    `;
}