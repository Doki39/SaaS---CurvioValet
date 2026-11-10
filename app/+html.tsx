import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

const SURFACE = "#f8f9fa";

const rootStyle = `
  html {
    color-scheme: light;
    background-color: ${SURFACE};
  }
  body,
  #root {
    min-height: 100%;
    background-color: ${SURFACE};
  }
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content={SURFACE} />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: rootStyle }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
