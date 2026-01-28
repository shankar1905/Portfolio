import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {

  api = 'http://localhost:5001/api/admin';

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
