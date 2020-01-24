import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
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

  updateUser(form): Observable<any> {
    const header = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
    return this.httpClient.put(environment.baseURL.url + '/updateUser', form, { headers: header });
  }

  uploadImage(file: File): Observable<any> {
    const formdata = new FormData();
    formdata.append('file', file);
    return this.httpClient.post(environment.baseURL.url + '/upload/image', formdata, { reportProgress: true, responseType: 'text' });
  }

}
