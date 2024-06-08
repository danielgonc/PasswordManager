import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PasswordsService {
  baseAddress = environment.baseAddress;
  constructor(private http: HttpClient) { }

  getPasswords(): Observable<any> {
    return this.http.get(`${this.baseAddress}/password-cards`, { headers: { Accept: 'application/json' } });
  }

  addPassword(body: any): Observable<any> {
    return this.http.post(`${this.baseAddress}/password-cards`, body, { headers: { Accept: 'application/json' } })
  }

  updatePassword(id: string, body: any): Observable<any> {
    return this.http.put(`${this.baseAddress}/password-cards/${id}`, body, { headers: { Accept: 'application/json' } });
  }

  deletePassword(id: string): Observable<any> {
    return this.http.delete(`${this.baseAddress}/password-cards/${id}`, { headers: { Accept: 'application/json' } });
  }
}
