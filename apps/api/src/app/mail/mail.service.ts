import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';
import sendmailFactory from 'sendmail';

const sendMail = promisify(sendmailFactory({}));

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  sendRequestEmail(name: string, phoneNumber: string, message?: string) {
    const ownerEmail = this.configService.get('OWNER_EMAIL');

    if (!ownerEmail) {
      return false;
    }

    console.log(`Trying to send request email to ${ownerEmail}.`);

    const messageHtml = message ? `<br/> Сообщение: <br/> ${message}` : '';

    return sendMail({
      from: 'server@lyubimovalexey.ru',
      to: ownerEmail,
      subject: `Новая заявка от "${name}"`,
      html: `
        Заявка для телефона <a href="tel:${phoneNumber}">${phoneNumber}</a>
        ${messageHtml}
      `
    });
  }
}
