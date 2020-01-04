import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string;
  password: string;

  constructor(private http: HttpClient) { }

  public login(username, password) {
    localStorage.removeItem('token');
    return this.http.post(environment.baseURL + '/login', { email: username, password }, {observe: 'response'})
      .pipe(map((res: any) => {
        if (res.ok) {
          localStorage.setItem('token', res.body.token);
          localStorage.setItem('role', res.headers.get('role'));
          const param = new HttpParams().set('email', username);
          return this.http.get(environment.baseURL + '/getUserDetails',{params: param})
        }
      }));
  }

  loggedIn() {
    return localStorage.getItem('token');
  }

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('role');
}

}

