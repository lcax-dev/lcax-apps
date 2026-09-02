import {
  OrganizationInvitation,
  type OrganizationInvitationProps,
} from "./organization-invitation.tsx";
import VerifyEmail, { type VerifyEmailProps } from "./verify-email.tsx";

export const emailTemplateNames = ["verify-email", "organization-invitation"] as const;

export type EmailTemplateName = (typeof emailTemplateNames)[number];

export type EmailTemplateVariables = {
  "verify-email": VerifyEmailProps;
  "organization-invitation": OrganizationInvitationProps;
};

export const emailTemplatePreviewVariables: {
  [K in EmailTemplateName]: EmailTemplateVariables[K];
} = {
  "verify-email": VerifyEmail.PreviewProps,
  "organization-invitation": OrganizationInvitation.PreviewProps,
};
