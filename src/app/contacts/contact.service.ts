import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { UserService } from '../common/user.service';

@Injectable()
export class ContactService {

  constructor (private http: Http,
               private user: UserService) {}

  private contactsUrl = '/api/contacts';

  // get('/api/contacts')
  getContacts(): Promise<Contact[]> {
    return this.http.get(this.user.signUri(this.contactsUrl))
                .toPromise()
                .then(response => response.json() as Contact[])
                .catch(this.handleError);
  }

  // post('/api/contacts')
  createContact(newContact: Contact): Promise<Contact> {
    return this.http.post(this.user.signUri(this.contactsUrl), newContact)
                .toPromise()
                .then(response => response.json() as Contact)
                .catch(this.handleError);
  }

  // get('/api/contacts/:id') endpoint not used by the app

  // put('/api/contacts/:id')
  updateContact(putContact: Contact): Promise<Contact> {
    var putUrl = this.user.signUri(this.contactsUrl + '/' + putContact._id);
    return this.http.put(putUrl, putContact)
                .toPromise()
                .then(response => response.json() as Contact)
                .catch(this.handleError);
  }

  // delete('/api/contacts/:id')
  deleteContact(delContactId: String): Promise<String> {
    return this.http.delete(this.user.signUri(this.contactsUrl + '/' + delContactId))
                .toPromise()
                .then(response => response.json() as String)
                .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
