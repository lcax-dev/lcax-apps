import { EmailSender } from '@lcax/emails'
import { logger } from '@/config/logger.ts'

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  from: process.env.SMTP_FROM,
}
const sender = new EmailSender(smtpConfig, logger)

interface SendOrganizationInvitationArgs {
  email: string
  invitedByUsername: string
  invitedByEmail: string
  teamName: string
  inviteLink: string
}

export const sendOrganizationInvitation = async (args: SendOrganizationInvitationArgs) => {
  return sender.sendEmail({
    template: 'organization-invitation',
    to: args.email,
    variables: {
      name: args.email,
      organizationName: args.teamName,
      invitationUrl: args.inviteLink,
    },
    subject: '',
  })
}
