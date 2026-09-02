import * as React from "react";
import { Button, Heading, Text } from "react-email";

import { EmailLayout } from "../components/email-layout.tsx";

export interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

export const VerifyEmail = ({ name, verificationUrl }: VerifyEmailProps) => {
  return (
    <EmailLayout preview="Verify your LCAx Search email address">
      <Heading as="h1">Welcome to ECO Portal!</Heading>
      <Text>Hello {name},</Text>
      <Text>Please verify your email address by clicking the button below:</Text>
      <Button
        href={verificationUrl}
        className="rounded bg-[#007bff] px-5 py-2.5 text-white no-underline"
      >
        Verify Email
      </Button>
      <Text>If you didn't request this, please ignore this email.</Text>
      <Text>
        Best regards,
        <br />
        LCAx Team
      </Text>
    </EmailLayout>
  );
};

VerifyEmail.PreviewProps = {
  name: "Jane Doe",
  verificationUrl: "https://example.com/verify?token=abc123",
} satisfies VerifyEmailProps;

export default VerifyEmail;
