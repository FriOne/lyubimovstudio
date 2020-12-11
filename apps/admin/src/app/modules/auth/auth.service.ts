import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type PasswordLoginResponse = {
  access_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.currentUser = {};
    }
  }

  get isLoggedIn() {
    return Boolean(this.currentUser);
  }

  logInWithPassword(email: string, password: string) {
    return this.http.post<PasswordLoginResponse>('/api/login', { email, password });
  }

  logInWithGoogle() {
    return this.http.post('/api/login/google', {});
  }

  authUser(accessToken: string) {
    this.currentUser = {};

    localStorage.setItem('access_token', accessToken);
  }

  logOut() {
    this.currentUser = null;

    localStorage.removeItem('access_token');
  }
}
