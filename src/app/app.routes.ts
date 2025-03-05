import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductComponent } from './product/product.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { SellDashboardComponent } from './customer/sell/sell-dashboard/sell-dashboard.component';
import { BuyDashboardComponent } from './customer/buy/buy-dashboard/buy-dashboard.component';
import { CheakoutComponent } from './customer/buy/cheakout/cheakout.component';
import { PagNotFoundComponent } from './shared/layouts/pag-not-found/pag-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminAuthGuardLogin, AdminAuthGuardService, BuyAuthGuardservice, SellAuthGuardservice, SellbuyAuthGuardLogin } from './shared/services/auth-guard.service';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
    {path:'',redirectTo:"home",pathMatch: "full"},
    {path:'home',component: HomeComponent},
    {path: "my-profile",component: UserProfileComponent },
    {path:"contact-us",component: ContactUsComponent},


    //admin
    {path:'',canActivate:[AdminAuthGuardLogin],children:[
         {path: "admin-login",component: AdminLoginComponent}
    ]
},
{
    path: '', canActivate:[AdminAuthGuardService] ,children:[
       {path: "admin-dashboard",component: AdminDashboardComponent},
       {path: "admin/user",component:UserCrudComponent},
       {path: "admin/Product",component:ProductComponent},
       {path: "admin/Product/view/:id",component:ViewComponent}
    ]
},

 {
    path:'',canActivate:[SellbuyAuthGuardLogin], children:[
        {path:"sign-in",component: SigninSignupComponent},
        {path:"sign-up",component:SigninSignupComponent}
    ]
 },
 {path:'',canActivate:[SellAuthGuardservice], children:[
    {path:"sell-dashboard",component:SellDashboardComponent},
     {path:"sell/product",component: ProductComponent}
 ]
},
{
    path:'',canActivate:[BuyAuthGuardservice] ,children:[
        {path: "buy-dashboard",component:BuyDashboardComponent},
        {path: "cheakout",component:CheakoutComponent},
        
    ]
},
{/*path:'**',component:PagNotFoundComponent*/}
];
