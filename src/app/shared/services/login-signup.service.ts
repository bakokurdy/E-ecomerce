import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviromnt';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url="http://localhost:3000";
  //public reg_url="http://localhost:3000";
  private http:HttpClient=inject<HttpClient>(HttpClient);
  private reg_url:string = environment.apiUrl;
  

  constructor(/*private http: HttpClient,*/ private apiService:ApiService) { }
  authLogin(User_name:any, password:any):Observable<any>{
    return this.apiService.get(this.login_url+'/User?email='+User_name+'&password='+password);
  }
  

  userRegister(user_dtt:any):Observable<any> {
    return this.http.post(this.reg_url+'/User',user_dtt);
  }
  
 /* userRegister(user_dtt:any):Observable<any>{
    return this.apiService.post(this.reg_url +'/User', user_dtt)
  }*/

  adminLogin(User_name:any, password:any):Observable<any>{
    return this.apiService.get(this.login_url+'/User?email='+User_name+'&password='+password+'&role=allaw');
  }

}


