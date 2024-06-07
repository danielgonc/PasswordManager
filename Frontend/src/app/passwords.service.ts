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
}
