import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  api = environment.apiUrl + '/api/visitors';

  constructor(private http: HttpClient) { }

  trackVisitor() {
    return this.http.post(this.api, {}).subscribe();
  }
}
