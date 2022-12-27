import { Component, OnInit, OnDestroy } from '@angular/core';
import { AskService } from '../ask.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  id : string;
  pwd : string;

  constructor(private service: AskService, private rout: Router) {
    //생성자에 private를 붙여서 의존성을 주입받으면 글로벌하게 사용가능 합니다.
    //private가 있으므로 다른 컴포넌트나 html파일에서는 접근할 수 없습니다.
  }

  ngOnInit(): void {
    
  }

  private script : Subscription; //subscribe 동작 후 만들어지는 대상

  login() {
    if(this.script){
      console.log(this.script);
      this.script.unsubscribe(); //구독 종료
    }
    
    //Observable 객체는 subscribe라는 함수를 통해서 구독할 수 있습니다.
    this.service.tryToLogin({id : this.id, pwd : this.pwd}).subscribe((arg:any)=>{
      console.log('login함수 arg:' + arg);
      if(arg.status == true){
        alert('Login Success!');
        this.rout.navigate(['/dashboard']);
      }
    });
  }

  ngOnDestroy() : void{
    console.log(this.script);
    if(this.script){
      this.script.unsubscribe();
    }
  }
}
