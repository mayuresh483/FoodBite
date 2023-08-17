import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItems } from 'src/app/shared/models/CartItems';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent {

  cart!:Cart;

  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
    });
  }

  removeFromCart(cartItem:CartItems){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItems,quantity:string){
    this.cartService.changeQuantity(cartItem.food.id,parseInt(quantity));
  }
}
