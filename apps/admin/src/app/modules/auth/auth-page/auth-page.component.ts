import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth.service';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ls-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  authorizing$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

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
