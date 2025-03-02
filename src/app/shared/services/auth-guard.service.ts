import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
//Admi before login
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogin  implements CanActivate{

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   let role = sessionStorage.getItem("role");
    if(role == "allaw"){
       this.router.navigate(["/admin-login"]);
      return false;
    }else{
      return true;
    }
  }
}
//Admin After login
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private router: Router) { }
  canActivate(route :ActivatedRouteSnapshot, state: RouterStateSnapshot){
   let role = sessionStorage.getItem("role");
    if(role == "allaw"){
      return true;
    }else{
      this.router.navigate(["/admin-dashboard"]);
      return false;
    }
  }
}
//Customer (seller&buyer) After login
@Injectable({
  providedIn: 'root'
})
export class SellbuyAuthGuardLogin implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state :RouterStateSnapshot){
   let role = sessionStorage.getItem("role");
    if(role == "sell"){
      this.router.navigate(["/sell-dashboard"]);
      return true;
    }else if(role == "buy"){
      this.router.navigate(["/buy-dashboard"]);
      return false;
    }else{
      return true;
    }
  }
}
//buy After login
@Injectable({
  providedIn: 'root'
})
export class BuyAuthGuardservice {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   let role = sessionStorage.getItem("role");
    if(role == "buy"){
      return true;
    }else{
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}
//sell After login check
@Injectable({
  providedIn: 'root'
})
export class SellAuthGuardservice {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   let role = sessionStorage.getItem("role");
    if(role == "sell"){
      return true;
    }else{
      this.router.navigate(["/sign-in"]);
      return false;
    }
  }
}
