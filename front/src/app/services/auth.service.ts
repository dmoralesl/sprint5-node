import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor() { 
    if (window.localStorage.getItem('isLoggedIn')) {
      this.isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn')?? 'false');
    }
  }

  validateUsername(username: String): boolean {
    // TODO request API to know if user already exists
    if (false) {
      return false;
    }
    
    return true;
  }

}
