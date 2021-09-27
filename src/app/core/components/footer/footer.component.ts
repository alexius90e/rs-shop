import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';
import { AppContactsService } from '../../services/app-contacts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public social: { type: string; href: string }[] = [];
  public contacts: Contact[] = [];

  constructor(private contactsService: AppContactsService) {}

  ngOnInit() {
    this.social = this.contactsService.getSocial();
    this.contacts = this.contactsService.getContacts();
  }
}
