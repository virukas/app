import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './helpers.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  addUsers(any: any) {
    throw new Error('Method not implemented.');
  }

  private API_BASE_PATH: string = "http://localhost:4200/api/";
 
  constructor(private _httpService: HttpClient) { }

  getexample(){
    return this._httpService.get("http://localhost:3000/listall")
  }

  getUsers() {
    return this._httpService.get(this.API_BASE_PATH + "users");
  }

  // getuser(userid: number) {
    // return this._httpService.get(`${this.API_BASE_PATH}users/${userid}`)

  // }

  getUser(userid: number) {
    return this._httpService.get(`${this.API_BASE_PATH}users/${userid}`)

  }


  addUser(user: User) {
    return this._httpService.post(`${this.API_BASE_PATH}users`, user)
  }

  updateUser(user: User) {
    return this._httpService.put(`${this.API_BASE_PATH}users/${user.id}`, user)
  }


  deleteUser(userid: number) {
    return this._httpService.delete(`${this.API_BASE_PATH}users/${userid}`)
  }
}

