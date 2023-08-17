import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { Tags } from '../shared/models/Tags';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_SEARCH_URL, FOOD_URL, FOOD_BY_ID_URL, SEARCH_TAG_URL, TAGS_URL } from '../shared/utility/constants';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOOD_URL);
  }

  getFoodFromSearch(foodSearch:string):Observable<Food[]>{
    return this.http.get<Food[]>(FOOD_SEARCH_URL + foodSearch);
  }

  getAllTags():Observable<Tags[]>{
    return this.http.get<Tags[]>(TAGS_URL);
  }

  getAllFoodByTag(tag:string):Observable<Food[]>{
    return this.http.get<Food[]>(SEARCH_TAG_URL + tag);
  }

  getFoodById(id:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + id);
  }
}
