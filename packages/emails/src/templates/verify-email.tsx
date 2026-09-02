import * as React from "react";
import { Button, Heading, Hr, Section, Text } from "react-email";

import { EmailLayout } from "../components/email-layout.tsx";

export interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
}

export const VerifyEmail = ({ name, verificationUrl }: VerifyEmailProps) => {
  return (
    <EmailLayout preview="Verify your LCAx Search email address">
      <Heading as="h1" className="my-0 text-2xl font-medium text-black">
        Welcome to LCAx Search!
      </Heading>
      <Hr className="my-6 border-t border-black" />
      <Text className="my-4 text-base font-normal leading-relaxed text-black">Hello {name},</Text>
      <Text className="my-4 text-base font-normal leading-relaxed text-black">
        Please verify your email address by clicking the button below:
      </Text>
      <Section className="my-6">
        <Button
          href={verificationUrl}
          className="inline-block rounded-full bg-yellow-4 px-6 py-3 text-base font-medium text-black no-underline"
        >
          Verify Email
        </Button>
      </Section>
      <Text className="my-4 text-sm font-normal leading-relaxed text-grey-8">
        If you didn't request this, please ignore this email.
      </Text>
      <Hr className="my-6 border-t border-black" />
      <Text className="my-4 text-base font-normal leading-relaxed text-black">
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
