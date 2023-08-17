import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FooddetailsComponent } from './pages/fooddetails/fooddetails.component';
import { AddtocartComponent } from './pages/addtocart/addtocart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { authGuard } from './auth/auth.guard';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'search/:searchfood', component:HomeComponent},
  {path:'tag/:foodTag', component:HomeComponent},
  {path:'food/:id', component:FooddetailsComponent},
  {path:'cart-page',component:AddtocartComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegistrationComponent},
  {path:'checkout',component: CheckoutComponent, canActivate:[authGuard]},
  {path:'payment',component: PaymentComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
