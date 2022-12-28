import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AskService } from './ask.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';  //저장소 모듈
import { BUCKET } from '@angular/fire/compat/storage';  //저장소 관련 버킷


const fireEnvironment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyBS0Ej60wakVj7KmWtBul8bVMV1D8i3Xnc",
    authDomain: "newmyproject-d9c46.firebaseapp.com",
    projectId: "newmyproject-d9c46",
    storageBucket: "newmyproject-d9c46.appspot.com",
    messagingSenderId: "918728974540",
    appId: "1:918728974540:web:1cb8171eb8aced003a6269",
    measurementId: "G-91ERMSZLTG"
  }
};

const router : Routes = [ //라우팅
  {path : 'login', component : LoginComponent},
  {path : 'dashboard', component : DashboardComponent, canActivate:[AuthGuard]},
  {path : '', redirectTo : '/login', pathMatch : 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(router,{enableTracing:false, useHash:true}), //새로고침 시 404를 방지하기 위해서 useHash를 추가하는 방법
    
    //AngularFireModule에서의 initializeApp이라는 static 함수(정적 메소드)를 가장 먼저 호출, 이 static함수를 호출하면 파이어베이스와의 설정 값을 등록하여 파이어베이스에 연결해주는 역할
    AngularFireModule.initializeApp(fireEnvironment.firebase, '/'),   //파이어 베이스 모듈 사용 
    AngularFirestoreModule,  //파이어베이스 데이터베이스와 관련된 모듈 사용
    AngularFireStorageModule  //파일 저장소 관련된 객체
  ],
  providers: [
    AskService,
    { provide: BUCKET, useValue: fireEnvironment.firebase.storageBucket}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
