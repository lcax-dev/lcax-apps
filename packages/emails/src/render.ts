import { createElement, type FunctionComponent } from "react";
import { render, toPlainText } from "react-email";

import { OrganizationInvitation } from "./templates/organization-invitation.tsx";
import { VerifyEmail } from "./templates/verify-email.tsx";
import {
  type EmailTemplateName,
  emailTemplateNames,
  type EmailTemplateVariables,
} from "./templates";

export {
  type EmailTemplateName,
  emailTemplateNames,
  emailTemplatePreviewVariables,
  type EmailTemplateVariables,
} from "./templates";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function isEmailTemplateName(name: string): name is EmailTemplateName {
  return (emailTemplateNames as readonly string[]).includes(name);
}

async function renderTemplate<P extends object>(
  subject: string,
  Component: FunctionComponent<P>,
  props: P,
): Promise<RenderedEmail> {
  const html = await render(createElement(Component, props));

  return {
    subject,
    html,
    text: toPlainText(html),
  };
}

type RenderEmailArgs = {
  [K in EmailTemplateName]: [name: K, variables: EmailTemplateVariables[K]];
}[EmailTemplateName];

export async function renderEmail<T extends EmailTemplateName>(
  name: T,
  variables: EmailTemplateVariables[T],
): Promise<RenderedEmail>;
export async function renderEmail(...args: RenderEmailArgs): Promise<RenderedEmail> {
  const [name, variables] = args;

  switch (name) {
    case "verify-email":
      return renderTemplate("Verify Your Email Address", VerifyEmail, variables);
    case "organization-invitation":
      return renderTemplate("Invitation to Join Organization", OrganizationInvitation, variables);
    default:
      throw new Error(`Template ${name} not found`);
  }
}
