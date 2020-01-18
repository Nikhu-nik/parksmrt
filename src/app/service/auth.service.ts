import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  public login(email: string, password: string) {
    return this.http.post<any>(environment.baseURL.url + '/login', { email: email, password: password }, { observe: 'response' });
  }

  loggedIn() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
  }

  requestReset(body: any): Observable<any> {
    return this.http.post(environment.baseURL.url + '/req-reset-password', body);
  }

  ValidPasswordToken(body: any): Observable<any> {
    return this.http.post(environment.baseURL.url + '/valid-password-token', body);
  }

  newPassword(body: any): Observable<any> {
    return this.http.post(environment.baseURL.url + '/new-password', body);
  }

}

