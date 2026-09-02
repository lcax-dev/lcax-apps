import type { ReactNode } from "react";

import * as React from "react";
import { Body, Container, Head, Html, Preview, Tailwind, pixelBasedPreset } from "react-email";

interface EmailLayoutProps {
  preview: string;
  children: ReactNode;
}

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body className="bg-white font-sans text-slate-900">
          <Container className="mx-auto px-4 py-6">{children}</Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
