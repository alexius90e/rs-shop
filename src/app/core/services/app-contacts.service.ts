import { Injectable } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';

@Injectable({
  providedIn: 'root',
})
export class AppContactsService {
  private socialNetworks: { type: string; href: string }[] = [
    { type: 'vk', href: 'https://vk.com/' },
    { type: 'facebook', href: 'https://www.facebook.com/' },
    { type: 'instagram', href: 'https://www.instagram.com/' },
    { type: 'youtube', href: 'https://www.youtube.com/' },
    { type: 'ok', href: 'https://ok.ru/' },
  ];

  private contacts: Contact[] = [
    { href: 'https://www.viber.com/ru/', value: 'Viber', type: 'viber' },
    { href: 'tel:+375293091021', value: '+375 29 302 10 21', type: 'a1' },
    { href: 'tel:+375255021021', value: '+375 25 502 10 21', type: 'mts' },
    { href: 'tel:+375337581021', value: '+375 33 758 10 21', type: 'phone' },
    {
      href: 'mailto: 21vek@gmail.com',
      value: '21vek@gmail.com',
      type: 'email',
    },
    { href: 'https://t.me/', value: 'Telegram', type: 'telegram' },
  ];

  getSocial(): { type: string; href: string }[] {
    return this.socialNetworks;
  }

  getContacts(): Contact[] {
    return this.contacts;
  }
}
