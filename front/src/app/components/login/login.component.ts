import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logged: boolean = false;

  constructor(private router: Router,    private authService: AuthService,) {}

  ngOnInit(): void {}

  loginForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
  });

  login() {
    // Checking if user exists
    this.logged = this.authService.validateUsername(this.loginForm.get('user')?.value);

    if (this.loginForm.value.user) {
      this.router.navigate(['/lobby']);
    }
  }
}
