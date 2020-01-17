import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient, private authService: AuthService
  ) { }

  addNewUser(form) {
    return this.httpClient.post(environment.baseURL.url + '/register', form, { responseType: 'text' as 'json' });
  }

  getUserDetails(): Observable<any> {
    const email = localStorage.getItem('currentUser');
    return this.httpClient.get(environment.baseURL.url + '/getUserDetails/' + email);
  }

}
