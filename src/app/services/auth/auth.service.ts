import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private baseUrl: string = "https://localhost:7000/api/Auth/";
  private baseUrl2: string = "https://moveuppoc.azurewebsites.net/api/videos/";
  private baseUrl3: string = "https://moveuppoc.azurewebsites.net/api/";


  // 註冊
  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }
  // 登入
  login(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, userObj)
  }
  // 登入
  getVideo() {
    return this.http.get<any>(`${this.baseUrl2}`)
  }
  // azureApi
  getAz(route: any) {
    return this.http.get<any>(`${this.baseUrl3}/${route}`)
  }
}
