import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CosmosDbApiService {

  constructor(private http: HttpClient) { }

  // private baseUrl: string = "https://localhost:8080/api/";
  private baseUrl: string = "https://moveuppoc.azurewebsites.net/api/";

  // cosmosDb使用get
  getAz(route: any) {
    return this.http.get<any>(`${this.baseUrl}${route}`)
  }
  // cosmosDb使用post
  postAz(route: any, userObj: any) {
    return this.http.post<any>(`${this.baseUrl}${route}`, userObj)
  }
  // cosmosDb使用put
  putAz(route: any, userObj: any, id: any) {
    return this.http.put<any>(`${this.baseUrl}${route}/${id}`, userObj)
  }
  // cosmosDb使用delete
  deleteAz(route: any, id: any) {
    return this.http.delete<any>(`${this.baseUrl}${route}/${id}`)
  }
}
