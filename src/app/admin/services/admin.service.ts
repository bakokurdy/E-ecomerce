import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 public user_url = "http://localhost:3000/User/";
 public product_url = "http://localhost:3000/Product/";
 public all_user = "http://localhost:3000/User/";
  constructor(private api: ApiService) { }

  userDashboarData(){
    return this.api.get(this.user_url);
  }
  productDashboarData(){
    return this.api.get(this.product_url);
  }
  allUser(): Observable<any>{
    return this.api.get(this.all_user);
  }
  addUser(user_dtt : any){
     return this.api.post(this.user_url, user_dtt);
  }
  //get data from indvidual user
  singleAUser(user_id: any){
     return this.api.get(this.user_url+user_id)
  }
  //update user
  editUser(user_id: any,user_dtt: any):Observable<any>{
      return this.api.put(this.user_url+user_id, user_dtt)
  }
  //delete user
  deleteUser(user_id: any){
    return this.api.delete(this.user_url+user_id)
  }
}
