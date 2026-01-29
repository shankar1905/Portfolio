import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {

  api = environment.apiUrl + '/api/admin';

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<any[]>(`${this.api}/messages`);
  }

  getVisitors() {
    return this.http.get<any[]>(`${this.api}/visitors`);
  }

  getStats() {
    return this.http.get<any>(`${this.api}/stats`);
  }
}
