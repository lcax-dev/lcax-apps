import nodemailer from "nodemailer";
import { renderEmail } from "./render.ts";
import { emailTemplateNames, type EmailTemplateVariables } from "./templates";

interface Logger {
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

export interface SendEmailOptions<T extends (typeof emailTemplateNames)[number]> {
  template: T;
  to: string;
  variables: EmailTemplateVariables[T];
  subject: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

export class EmailSender {
  private transporter: nodemailer.Transporter;
  private config: SmtpConfig;
  private _logger: Logger;

  constructor(config: SmtpConfig, logger: Logger) {
    this.config = config;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
    this._logger = logger;
  }

  async sendEmail<T extends (typeof emailTemplateNames)[number]>(
    options: SendEmailOptions<T>,
  ): Promise<nodemailer.SentMessageInfo> {
    const renderedTemplate = await renderEmail<T>(options.template, options.variables);
    const subject = options.subject || renderedTemplate.subject;

    const mailOptions: nodemailer.SendMailOptions = {
      from: this.config.from,
      to: options.to,
      subject,
      html: renderedTemplate.html,
      text: renderedTemplate.text,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      this._logger.info(
        "Logging email activity:",
        options.template,
        options.to,
        subject,
        "sent",
        result.messageId,
        options.variables,
      );
      return result;
    } catch (error) {
      this._logger.error(
        options.template,
        options.to,
        subject,
        "failed",
        undefined,
        options.variables,
      );
      throw error;
    }
  }
}
