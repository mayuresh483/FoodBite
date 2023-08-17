import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItems } from '../shared/models/CartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);

  constructor() { }

  addToCart(food:Food):void{
    let cartItem = this.cart.items.find(item=> item.food.id === food.id);
    if(cartItem){
      return;
    }
    this.cart.items.push(new CartItems(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodid:string):void{
    this.cart.items = this.cart.items.filter(items=>items.food.id != foodid);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items.find(index => index.food.id===foodId);
    if(!cartItem){
      return;
    }
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  get getCart():Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.
    reduce((prevSum, currentSum)=> prevSum + currentSum.price,0);
    this.cart.totalCount = this.cart.items.
    reduce((prevCount, currenCount)=> prevCount+ currenCount.quantity,0);
    const cartJSON = JSON.stringify(this.cart);
    localStorage.setItem('Cart',cartJSON);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJSON = localStorage.getItem('Cart');
    return cartJSON ? JSON.parse(cartJSON): new Cart();
  }
}
