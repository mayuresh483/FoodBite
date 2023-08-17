import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchFood:any='';

  constructor(activatedRoute:ActivatedRoute, protected router:Router){
    activatedRoute.params.subscribe((params)=>{
      if(params['searchfood']){
        this.searchFood = params['searchfood'];
      }
    });
  }

  search(food:string):void{
    if(food){
      this.router.navigateByUrl('search/'+food);
    }else{
      this.router.navigateByUrl('');
    }
  }
}
