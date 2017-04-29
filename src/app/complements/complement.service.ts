import { Injectable } from '@angular/core';
import { Complement } from './complement';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { UserService } from '../common/user.service';

@Injectable()
export class ComplementService {

  constructor(private http: Http,
              private user: UserService) {}

  private complementsUrl = '/api/complements';

  // get("/api/complements")
  getComplements(): Promise<Complement[]>{
    return this.http.get(this.user.signUri(this.complementsUrl))
               .toPromise()
               .then(response => response.json() as Complement[])
               .catch(this.handleError);
  }

  // post("/api/complements")
  createComplement(newComplement: Complement): Promise<Complement> {
    return this.http.post(this.user.signUri(this.complementsUrl), newComplement)
               .toPromise()
               .then(response => response.json() as Complement)
               .catch(this.handleError);
  }

  // get("/api/complements/:id")
  getOneComplement(complementId: String): Promise<Complement>{
    return this.http.get(this.user.signUri(this.complementsUrl + '/' + complementId))
               .toPromise()
               .then(response => response.json() as Complement)
               .catch(this.handleError);
  }

  // put("/api/complements/:id")
  updateComplement(putComplement: Complement): Promise<Complement> {
    var putUrl = this.user.signUri(this.complementsUrl + '/' + putComplement._id);
    return this.http.put(putUrl, putComplement)
               .toPromise()
               .then(response => response.json() as Complement)
               .catch(this.handleError);
  }

  // delete("/api/complements/:id")
  deleteComplement(delComplementId: String): Promise<String> {
    return this.http.delete(this.user.signUri(this.complementsUrl + '/' + delComplementId))
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
