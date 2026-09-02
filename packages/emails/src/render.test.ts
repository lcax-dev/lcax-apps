import { describe, expect, it } from "vitest";

import {
  emailTemplateNames,
  emailTemplatePreviewVariables,
  isEmailTemplateName,
  renderEmail,
} from "./render.ts";

describe("renderEmail", () => {
  it("renders the verify-email template with typed variables", async () => {
    const result = await renderEmail("verify-email", {
      name: "Jane Doe",
      verificationUrl: "https://example.com/verify?token=abc123",
    });

    expect(result.subject).toBe("Verify Your Email Address");
    expect(result.html).toContain("Jane Doe");
    expect(result.html).toContain("https://example.com/verify?token=abc123");
    expect(result.html).toContain("rgb(232,197,71)");
    expect(result.html).toContain("Inter Tight");
    expect(result.text).toContain("Jane Doe");
    expect(result.text).toContain("https://example.com/verify?token=abc123");
  });

  it("renders the organization-invitation template", async () => {
    const result = await renderEmail("organization-invitation", {
      name: "Alex Rivera",
      organizationName: "Acme Corp",
      invitationUrl: "https://example.com/invite?token=xyz",
    });

    expect(result.subject).toBe("Invitation to Join Organization");
    expect(result.html).toContain("Alex Rivera");
    expect(result.html).toContain("Acme Corp");
    expect(result.html).toContain("https://example.com/invite?token=xyz");
    expect(result.html).toContain("rgb(232,197,71)");
    expect(result.html).toContain("Inter Tight");
    expect(result.text).toContain("Acme Corp");
  });

  it("identifies known template names", () => {
    expect(emailTemplateNames).toEqual(["verify-email", "organization-invitation"]);
    expect(isEmailTemplateName("verify-email")).toBe(true);
    expect(isEmailTemplateName("missing-template")).toBe(false);
  });

  it("exposes preview variables for each template", () => {
    expect(emailTemplatePreviewVariables["verify-email"]).toEqual({
      name: "Jane Doe",
      verificationUrl: "https://example.com/verify?token=abc123",
    });
    expect(emailTemplatePreviewVariables["organization-invitation"]).toEqual({
      name: "Alex Rivera",
      organizationName: "Acme Corp",
      invitationUrl: "https://example.com/invite?token=xyz",
    });
  });
});
