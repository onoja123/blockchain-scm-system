import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { EmailOptions } from '../types/interfaces/mail.inter';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import juice from 'juice';

dotenv.config();

const compileTemplate = (templateName: string, placeholders?: Record<string, string>): string => {
  const filePath = path.join(__dirname, '../templates', `${templateName}.html`);
  console.log(`[sendEmail] Compiling template: ${filePath}`);
  const templateContent = fs.readFileSync(filePath, 'utf-8');
  const template = Handlebars.compile(templateContent);
  let html = template(placeholders);

  html = juice(html);

  return html;
};

const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    const host = process.env.SMTP_HOST || '';
    const port = parseInt(process.env.SMTP_PORT || '587');

    console.log(`[sendEmail] Creating transporter with host: ${host}, port: ${port}, user: ${user}`);

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const html = compileTemplate(options.templateName, options.placeholders);

    const mailOptions = {
      from: user,
      to: options.to,
      subject: options.subject,
      html: html,
    };

    console.log(`[sendEmail] Sending email to: ${options.to}, subject: ${options.subject}`);

    const info = await transporter.sendMail(mailOptions);

    console.log(`[sendEmail] Email sent: ${info.messageId}`);
  } catch (error) {
    console.error('[sendEmail] Error sending email:', error);
  }
};

export default sendEmail;