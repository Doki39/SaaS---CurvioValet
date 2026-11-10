import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

const NAVY = "#131b2e";

const rootStyle = `
  html {
    color-scheme: dark;
    background-color: ${NAVY};
  }
  body,
  #root {
    background-color: ${NAVY};
  }
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content={NAVY} />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: rootStyle }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
