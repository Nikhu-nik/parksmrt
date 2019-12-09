import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string;
  password: string;

  constructor(private http: HttpClient) { }

  public login(username, password) {
    sessionStorage.removeItem('token');
    return this.http.post(environment.baseURL + '/login', { email: username, password }, {observe: 'response'})
      .pipe(map((res: any) => {
        if (res.ok) {
          sessionStorage.setItem('token', res.headers.get('Authorization'));
          sessionStorage.setItem('currentUser', username);
          sessionStorage.setItem('role', res.headers.get('role'));
          // console.log(sessionStorage.getItem('token'));
        }
      }));
  }

  loggedIn() {
    return sessionStorage.getItem('token');
  }

logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('role');
}

}

