import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartCount:number = 0;
  User!:User;
  constructor(private cartService:CartService, private user:UsersService){
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cartCount = cart.totalCount;
    });

    this.user.userObservable.subscribe((user)=>{
      this.User = user;
    });
  }

  logOut(){
    this.user.logOutUser();
  }
}
