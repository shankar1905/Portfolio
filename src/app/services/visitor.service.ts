import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  api = 'http://localhost:5001/api/visitor';

  constructor(private http: HttpClient) { }

  trackVisitor() {
    return this.http.post(this.api, {}).subscribe();
  }
}
