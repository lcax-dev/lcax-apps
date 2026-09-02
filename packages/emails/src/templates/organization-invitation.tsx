import * as React from "react";
import { Button, Heading, Text } from "react-email";

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
      <Heading as="h1">You're Invited!</Heading>
      <Text>Hello {name},</Text>
      <Text>You have been invited to join {organizationName} on LCAx Search</Text>
      <Button
        href={invitationUrl}
        className="rounded bg-[#007bff] px-5 py-2.5 text-white no-underline"
      >
        Accept Invitation
      </Button>
      <Text>
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
