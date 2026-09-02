import * as React from "react";
import { Button, Heading, Hr, Section, Text } from "react-email";

import { EmailLayout } from "../components/email-layout.tsx";

export interface OrganizationInvitationProps {
  name: string;
  organizationName: string;
  invitationUrl: string;
}

export const OrganizationInvitation = ({
  name,
  organizationName,
  invitationUrl,
}: OrganizationInvitationProps) => {
  return (
    <EmailLayout preview={`Invitation to join ${organizationName} on LCAx Search`}>
      <Heading as="h1" className="my-0 text-2xl font-medium text-black">
        You're Invited!
      </Heading>
      <Hr className="my-6 border-t border-black" />
      <Text className="my-4 text-base font-normal leading-relaxed text-black">Hello {name},</Text>
      <Text className="my-4 text-base font-normal leading-relaxed text-black">
        You have been invited to join <strong>{organizationName}</strong> on LCAx Search.
      </Text>
      <Section className="my-6">
        <Button
          href={invitationUrl}
          className="inline-block rounded-full bg-yellow-4 px-6 py-3 text-base font-medium text-black no-underline"
        >
          Accept Invitation
        </Button>
      </Section>
      <Hr className="my-6 border-t border-black" />
      <Text className="my-4 text-base font-normal leading-relaxed text-black">
        Best regards,
        <br />
        LCAx Team
      </Text>
    </EmailLayout>
  );
};

OrganizationInvitation.PreviewProps = {
  name: "Alex Rivera",
  organizationName: "Acme Corp",
  invitationUrl: "https://example.com/invite?token=xyz",
} satisfies OrganizationInvitationProps;

export default OrganizationInvitation;
