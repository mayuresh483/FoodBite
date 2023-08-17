import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { TagsComponent } from './pages/tags/tags.component';
import { FooddetailsComponent } from './pages/fooddetails/fooddetails.component';
import { AddtocartComponent } from './pages/addtocart/addtocart.component';
import { TitleComponent } from './pages/title/title.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './pages/input-container/input-container.component';
import { InputValidationComponent } from './pages/input-validation/input-validation.component';
import { DefaultButtonComponent } from './pages/default-button/default-button.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoadingComponent } from './pages/loading/loading.component'
import { InterceptorsInterceptor } from './interceptor/interceptors.interceptor';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';
import { MapComponent } from './pages/map/map.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaypalButtonComponent } from './pages/paypal-button/paypal-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FooddetailsComponent,
    AddtocartComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    InputContainerComponent,
    InputValidationComponent,
    DefaultButtonComponent,
    RegistrationComponent,
    LoadingComponent,
    CheckoutComponent,
    OrderlistComponent,
    MapComponent,
    PaymentComponent,
    PaypalButtonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorsInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
