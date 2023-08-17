import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interface/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTRATION_URL } from '../shared/utility/constants';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interface/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toast:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toast.success(
            `Welcome to FoodBite ${user.name}!`,
            `Login Successful`
          )
        },error:(error)=>{
          this.toast.error(error.error,'Login Failed');
        }
      })
    );
  }

  get currentUser():User{
    return this.userSubject.value;
  }

  logOutUser(){
    this.userSubject.next(new User());
    localStorage.removeItem('User');
    window.location.reload();
  }

  registration(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTRATION_URL,userRegister).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toast.success(
            `User Registered Successful`
          )
          this.toast.success(
            `Welcome to FoodBite ${user.name}!`
          )
        },error:(error)=>{
          this.toast.error(error.error,'Login Failed');
        }
      })
    );
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem('User', JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const user = localStorage.getItem('User');
    if(!user) return new User();
    return JSON.parse(user) as User;
  }
}
