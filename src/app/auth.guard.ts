import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AskService } from './ask.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private status : boolean = false;

  constructor(private serv : AskService){
    serv.isLogged.subscribe(result=>{
      console.log('result after asking to server', result);
      this.status=result;
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.serv.isLogIn();
    return this.status; //가드에서의 결과 값의 형태가 거짓(false)을 의미하면 해당 컴포넌트로 갈 수 없음을 의미
  }
  
}
