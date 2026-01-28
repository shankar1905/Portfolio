import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  api = 'http://localhost:5001/api/contact';

  constructor(private http: HttpClient) { }

  sendMessage(data: any) {
    return this.http.post(this.api, data);
  }
}
