import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces/SocketModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  userExists: boolean = false;

  constructor(private router: Router,    private authService: AuthService,) {
    if (sessionStorage.getItem('chatUser')) {this.goToLobby();}
  }

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
  });

  async login() {
    const user: IUser = await this.authService.loginUser(this.loginForm.get('user')?.value);

    if (user) {
      sessionStorage.setItem('chatUser', JSON.stringify(user));
      this.goToLobby();
    } else {
      this.userExists = true;
    }
  }

  goToLobby(): void {
    this.router.navigate(['/lobby']);
  }
}
