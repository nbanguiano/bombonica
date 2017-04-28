import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent implements OnChanges {
  @Input()
  contact: Contact;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private contactService: ContactService,
               private location: Location) {}

  contactSources = [
    {id: 1, label: "Referencia"},
    {id: 2, label: "Wallapop"},
    {id: 3, label: "Facebook"},
    {id: 4, label: "Otros"}
  ];

  ngOnChanges() {
    if (this.contact) {
      this.location.replaceState("/admin/contacts/" + this.contact._id);
    }
  }

  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }
}
