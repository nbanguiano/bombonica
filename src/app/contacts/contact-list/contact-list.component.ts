import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { Order } from '../../orders/order';
import { OrderService } from '../../orders/order.service';

import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { OrderListContactComponent } from '../../orders/order-list-contact/order-list-contact.component';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService, OrderService]
})

export class ContactListComponent implements OnInit {

  contacts: Contact[]
  selectedContact: Contact

  orders: Order[]

  constructor(private contactService: ContactService,
              private orderService: OrderService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.contactService
        .getContacts()
        .then((contacts: Contact[]) => {
          this.contacts = contacts;
        });

    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let contactId = params['id'];
      if (contactId) {
        this.contactService.getOneContact(contactId)
            .then((contact: Contact) => {this.selectContact(contact)})
      }
    });
  }

  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;

    this.orderService.getOrdersByContactId(contact._id)
        .then((orders: Order[]) => {
          this.orders = orders;
        })
  }

  createNewContact() {
    var contact: Contact = {
      name: '',
      source: '',
      comment: ''
    };
    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }

  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }
}
