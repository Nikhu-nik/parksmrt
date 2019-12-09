import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private authService: AuthService
  ) { }

  addNewUser(form) {
    return this.httpClient.post(environment.baseURL + '/register', form, { responseType: 'text' as 'json' });
  }

  getUserDetails(): Observable<any> {
    const header = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));
    const param = new HttpParams().set('email', sessionStorage.getItem('currentUser'));
    return this.httpClient.get(environment.baseURL + '/user/getUser', {
      params: param, headers: header, observe: 'response'
    });
  }

}
