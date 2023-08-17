import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  order:Order = new Order();
  constructor(orderService:OrderService , router:Router, 
    toast:ToastrService){
    orderService.getOrder().subscribe({
      next:(order)=>{
        this.order = order;
      },
      error:()=>{
        router.navigateByUrl('/checkout'); 
        toast.warning('Unable to fetch the order');
      }
    })
  }
}
