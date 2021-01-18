import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private user = this.configService.get('GMAIL_USER');
  private password = this.configService.get('GMAIL_PASSWORD');
  private transport;

  constructor(private configService: ConfigService) {
    if (!this.user) {
      return;
    }

    this.transport = createTransport({
      service: 'gmail',
      auth: {
        user: this.user,
        pass: this.password,
      }
    });
  }

  sendRequestEmail(name: string, phoneNumber: string, message?: string) {
    if (!this.user) {
      return;
    }

    const ownerEmail = this.configService.get('OWNER_EMAIL');

    if (!ownerEmail) {
      return false;
    }

    this.logger.log(`Trying to send request email to ${ownerEmail}.`);

    const messageHtml = message ? `<br/> Сообщение: <br/> ${message}` : '';

    return this.transport.sendMail({
      from: `LyubimovStudio <${this.user}>`,
      to: ownerEmail,
      subject: `Новая заявка ${name ? `от "${name}"`: ''}`,
      html: `
        Заявка для телефона <a href="tel:${phoneNumber}">${phoneNumber}</a>
        ${messageHtml}
      `
    });
  }
}
