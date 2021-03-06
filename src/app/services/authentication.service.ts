import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from 'process';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 // uri:string;
  uri:string;
  constructor(private http: HttpClient, private location: Location, @Inject(DOCUMENT) private document) { 
    this.uri = document.location.protocol +'//'+ document.location.hostname +':'+ document.location.port+ '/user';
  }


  currentUser$: Subject<User> = new Subject<User>();
  
  login(username: string, password: string) {
    this.uri = document.location.protocol +'//'+ document.location.hostname +':'+ document.location.port + '/user';    

    return this.http.post<any>(`${this.uri}/authenticate`, { username: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) { //if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUser$.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.currentUser$.next(undefined);
    localStorage.removeItem('currentUser');
    
  }
}
