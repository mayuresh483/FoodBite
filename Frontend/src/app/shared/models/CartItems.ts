import { Food } from "./Food";

export class CartItems{
    constructor(public food:Food){}
    
    price:number = this.food.price;
    quantity:number = 1;
}