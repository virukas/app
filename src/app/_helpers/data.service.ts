import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { User } from './helpers.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let users: User[] = [
      { id: 1, title: 'Mr', fristName: 'vikas', lastname: 'yadav', dob: '1997-17-10', email: 'vikas@gmail.com', password: '12345678', acceptTerms: true },
      { id: 2, title: 'Mr', fristName: 'rinku', lastname: 'yadav', dob: '1998-06-06', email: 'vikas1@gmail.com', password: '12345678', acceptTerms: true }

    ]
    return { users };
  }




}

