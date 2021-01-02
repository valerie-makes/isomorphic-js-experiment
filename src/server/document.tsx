import { h } from 'preact';
import serialize from 'serialize-javascript';

export interface DocumentProps {
  lang?: string;
  title: string;
}

interface FullDocumentProps<ViewProps> extends DocumentProps {
  viewHTML: string;
  viewProps: ViewProps;
}

function Document<ViewProps>({
  lang = 'en',
  title,
  viewHTML,
  viewProps,
}: FullDocumentProps<ViewProps>) {
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </head>
      <body>
        <div id="__view" dangerouslySetInnerHTML={{ __html: viewHTML }} />
        <script
          id="__viewProps"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: serialize(viewProps, { isJSON: true }),
          }}
        />
        <script src="/dist/bundle.js" />
      </body>
    </html>
  );
}

export default Document;