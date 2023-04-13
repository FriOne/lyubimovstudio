import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'ls-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  authorizing$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authForm.valueChanges.subscribe(() => this.error$.next(null));
  }

  onSuccessAuth(accessToken: string) {
    this.authService.authUser(accessToken);
    this.router.navigate(['/']);
  }

  onAuthError(responseError: HttpErrorResponse) {
    if (responseError.status === 401) {
      this.error$.next('Неверные имя пользователя или пароль');
    }
    else {
      this.error$.next('Неизвестная ошибка');
    }
  }

  onSubmit() {
    this.authForm.markAllAsTouched();

    if (this.authForm.invalid) {
      return;
    }

    const { email, password } = this.authForm.value;

    this.authorizing$.next(true);

    this.authService
      .logInWithPassword(email, password)
      .pipe(
        map(response => response.access_token),
        finalize(() => this.authorizing$.next(false)),
      )
      .subscribe(
        (accessToken: string) => this.onSuccessAuth(accessToken),
        (error: HttpErrorResponse) => this.onAuthError(error),
      );
  }
}
