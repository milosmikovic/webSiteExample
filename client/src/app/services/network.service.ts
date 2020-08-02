import { LoginData } from './../../models/loginData';
import { UserResponse } from './../../models/userResponse';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private loggedUser : User = null;
  public loggedIn : Subject<boolean>;
  private registerUrl : string = "http://localhost:3000/usersNew/";
  private loginUrl : string = "http://localhost:3000/usersNew/login";
  private logoutUrl : string = "http://localhost:3000/usersNew/logout"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http : HttpClient,private router : Router) {
    this.loggedIn = new Subject();
    this.getLogin();
    console.log("uradio get login!")
  }

  public register(registerData : User) : Observable<UserResponse>{
    const body = {
      "name" : registerData.name,
      "surname" : registerData.surname,
      "username" : registerData.username,
      "password" : registerData.password,
      "email" : registerData.email,
      "phone" : registerData.phone
    }
    return this.http.put<UserResponse>(this.registerUrl,body,this.httpOptions);
  }

  public doLogin(loginData : LoginData){
    const body = {
      "username" : loginData.username,
      "password" : loginData.password
    };
    this.http.post(this.loginUrl,body,{withCredentials : true}).subscribe((resp : UserResponse) => {
      this.loggedIn.next(true);
      this.loggedUser = resp.user;
      this.router.navigate(['']);
    },(err) => {
      this.loggedIn.next(false);
      this.loggedUser = null;
      window.alert(err.error.message);
    });
  }

  public getLogin() {
    this.http.get(this.loginUrl, {
      withCredentials: true
    }).subscribe((resp: any) => {
      this.loggedUser = resp.user;
      this.loggedIn.next(resp.loggedIn);
    }, (err) => {
      window.alert("Oops, something went wrong getting the logged in status");
    })
  }

  public logout() {
    this.http.post(this.logoutUrl, {}, {
      withCredentials: true
    }).subscribe(() => {
      this.loggedIn.next(false);
      this.router.navigate([''])
    });
  }

  public getLoggedUser() : User {
    return this.loggedUser;
  }


}
