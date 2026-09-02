import type { ReactNode } from "react";

import * as React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Tailwind,
  pixelBasedPreset,
} from "react-email";

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter Tight"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/intertight/v7/NGSzv5HMAW1rn2JztbPRrPKDOTY1z5Q4N5E.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter Tight"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/intertight/v7/NGSzv5HMAW1rn2JztbPRrPKDOTY1z5Q4N5E.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                yellow: {
                  0: "#fff9e2",
                  1: "#fbf2cf",
                  2: "#f4e3a4",
                  3: "#eed474",
                  4: "#e8c547",
                  5: "#e5be32",
                  6: "#e4ba22",
                  7: "#caa312",
                  8: "#b49107",
                  9: "#9b7d00",
                },
                grey: {
                  0: "#f5f5f5",
                  1: "#e7e7e7",
                  2: "#d9d9d9",
                  3: "#b2b2b2",
                  4: "#9a9a9a",
                  5: "#8b8b8b",
                  6: "#848484",
                  7: "#717171",
                  8: "#656565",
                  9: "#575757",
                },
                indigo: {
                  0: "#f1f2f9",
                  1: "#e0e2eb",
                  2: "#bdc2d9",
                  3: "#97a0c7",
                  4: "#7883b8",
                  5: "#6470af",
                  6: "#5967ac",
                  7: "#4a5797",
                  8: "#414d87",
                  9: "#354278",
                },
                black: "#000000",
                white: "#ffffff",
              },
              fontFamily: {
                sans: [
                  '"Inter Tight"',
                  "-apple-system",
                  "BlinkMacSystemFont",
                  '"Segoe UI"',
                  "Roboto",
                  "sans-serif",
                ],
              },
            },
          },
        }}
      >
        <Body className="bg-grey-0 font-sans text-black">
          <Container className="mx-auto max-w-[560px] px-6 py-10">{children}</Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
