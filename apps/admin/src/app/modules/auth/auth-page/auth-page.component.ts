import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth.service';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ls-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  authForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  authorizing$ = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  onSuccessAuth(accessToken: string) {
    this.authService.authUser(accessToken);
    this.router.navigate(['/']);
  }

  onSubmit() {
    const { email, password } = this.authForm.value;

    this.authorizing$.next(true);

    this.authService
      .logInWithPassword(email, password)
      .pipe(
        map(response => response.access_token),
        finalize(() => this.authorizing$.next(false)),
      )
      .subscribe((accessToken: string) => this.onSuccessAuth(accessToken));
  }
}
