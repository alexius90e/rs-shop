import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact';
import { AppContactsService } from '../../services/app-contacts.service';

@Component({
  selector: 'app-header-information',
  templateUrl: './header-information.component.html',
  styleUrls: ['./header-information.component.scss']
})
export class HeaderInformationComponent implements OnInit {
  location: string ='';
  workingHours: string = '';
  contacts: Contact[] = [];
  isContactsVisible: boolean = false;

  constructor(private appContacts: AppContactsService) {}

  ngOnInit() {
    this.location = 'Minsk';
    this.workingHours = 'с 8:00 до 22:00';
    this.contacts = this.appContacts.getContacts();
  }

  showHiddenContacts() {
    this.isContactsVisible = !this.isContactsVisible;
  }
}
