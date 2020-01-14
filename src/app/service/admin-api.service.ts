import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(environment.baseURL + '/getAllUsers');
  }

  deleteUser(id: string) {
    return this.httpClient.delete(environment.baseURL + '/deleteUser/' + id );
  }
}
