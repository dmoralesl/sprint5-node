import { IUser } from '../interfaces/SocketModels';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {
    if (window.localStorage.getItem('isLoggedIn')) {
      this.isLoggedIn = JSON.parse(
        window.localStorage.getItem('isLoggedIn') ?? 'false'
      );
    }
  }

  async loginUser(username: string): Promise<IUser> {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: username }),
    });
    const parsedResponse = await response.json();
    return parsedResponse?.data;
  }

  async logoutUser(id: string): Promise<void> {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    });
  }


}
