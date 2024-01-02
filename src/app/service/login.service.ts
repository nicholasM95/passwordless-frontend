import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PublicKeyCredentialRequestOptionsJSON} from "@simplewebauthn/typescript-types";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(username: string): Observable<PublicKeyCredentialRequestOptionsJSON> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    const body = {
      'username': username
    };

    return this.http.post<PublicKeyCredentialRequestOptionsJSON>('http://localhost:8080/login/start', body, httpOptions).pipe();
  }

  verify(username: string, assertionResponse: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    };

    const body = {
      'username': username,
      'response': assertionResponse
    };

    return this.http.post('http://localhost:8080/login/verify', body, httpOptions).pipe();
  }
}
