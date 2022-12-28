import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/compat/firestore';

import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AskService {
  private DataBase : AngularFirestore;
  //private itemsCollection: AngularFirestoreCollection<any>;  //사용하지 않습니다. 전역변수로 사용하면 중첩 문제 생길 수 있음
  private collectionArray : {[index: string]:any} = {};  //json형식으로 변경하여 줍니다. 
    
  //저장소(나중에 데이터베이스 서버)
  private readonly storage = {
    id : 'admin',
    pwd : '1234'
  }

  constructor(db : AngularFirestore) {   //모듈에서 만들어진 파이어 베이스 접속관련 객체
    this.DataBase = db;
    //this.getItem('board').subscribe((res)=>{  //board 컬렉션에 대해서 구독행위 시작
    //  console.log(res);
    //});
  }  
  /*//파이프, 테이크 예제
  testPipeTake(){
    this.DataBase.collection<any>("test").stateChanges().pipe(
      take(1), //1번만 구독, 구독하는 대상의 행위를 종료
      map(actions => { //map은 가공의 의미
        return actions.map(a=>a.payload.doc.data());
      })).subscribe( 
      arg=>{
        console.log(arg);
      }
    )
  }*/

  
  //"select * from board"
  //getItem함수에서 맨 처음 호출하는 것은 DataBase 객체(AngularFirestore로 구성된) 
  //해당 객체에서 collection이라는 함수를 실행하는데 2개의 파라미터가 필요
  //첫번째 파라미터는 바라볼 컬렉션 이름, 두번째 파라미터는 옵셔널 형식의 람다식 입니다.
  //두번째 파라미터는 옵셔널 이므로 해당 내용을 지워도 실행되는데 문제는 없
  //AngularFirestoreCollection라는 형태의 클래스 객체는 valueChanges라는 함수를 실행하게 되면 구독 가능한 형태의 객체로 만들어지게 됩니다.
  //해당 컬렉션에 대해서 내용이 바뀌는 경우에 구독자에게 내용을 발행하여 주는 함수
  getItem(db_name : string){
    if(this.collectionArray[db_name]){
      this.collectionArray[db_name]=null;
    }
    this.collectionArray[db_name] = this.DataBase.collection<any>(db_name, (ref : CollectionReference) =>{
      //return ref.where("hello","==",'hahaha'); //질의
      //return ref.where("world","array-contains", "aaa");  // array-contains가 연산자 입니다. world라는 배열에 aaa값이 있는지 찾습니다.
      //return ref.orderBy('number','asc').startAt(1).limit(3); //시작, 한계점 추가
      return ref;
    });  //컬렉션에 접속    
    //return this.itemsCollection.valueChanges();  //리턴
    return this.collectionArray[db_name] ;
  }

  addItem(db_name : string, data : any){
    if(this.collectionArray[db_name] == null){
      this.collectionArray[db_name] = this.DataBase.collection<any>(db_name);
    }
    this.collectionArray[db_name] .add(data);
  }

  updateData(db_name: string, parameter : any, target_id : any){
    this.collectionArray[db_name].stateChanges().pipe( //데이터를 단순하게 보는 것에는 valueChanges 함수가 좀 더 최적화 되어 있으며, 다양한 행동에 대해서 기능을 완성하려면 stateChanges함수를 사용
      take(1), //구독은 한번만!, 상태 변화 시 호출인데 무한 루프 돌아감
      map((actions : any)=>{ //첫번째 map은 stateChanges를 통해서 생성된 객체를 가공한다는 의미
        return actions.map((a : any)=>{ //두번째 map은 첫번째 map을 통해 생성된 객체에서 다양한 정보를 가져오는 의미
          const data = a.payload.doc.data();  //데이터  
          const ID = a.payload.doc.id;  //고유 키 값
          if(target_id == ID){ //들어온 ID 값이 같다면
            this.collectionArray[db_name].doc(ID).update(parameter); //교체할 내용을 수정
          }
          return data;
        });
      })
    ).subscribe(); //stateChanges를 통해서 생성된 기능은 구독(subscribe)을 하지 않으면 아무런 행동을 하지 않습니다.
  }

  updateData2(db_name: string, parameter : any, target_id : any){
    this.collectionArray[db_name].doc(target_id).update(parameter); 
  }

  updateData3(db_name: string, parameter : any, target_id : any){
    this.collectionArray[db_name].doc(target_id).set(parameter); //set 데이터를 전부 바꾸어버리는 기능, param으로 덮어 쓰기
  }

  deleteData(db_name: string, target_id : any){
    this.collectionArray[db_name].doc(target_id).delete(); 
  }

  /*
  constructor() { //생성자에게 2개의 구독 지시
    this.test1().subscribe((arg:any)=>{
      console.log(arg);
    });
    this.test1().subscribe((arg:any)=>{
      console.log(arg);
    })
  }
  
  test1(){
    return new Observable(arg=>{
      arg.next({test:1});
      arg.next({test:2});
      arg.next({test:3});
      arg.complete();
    })
  }
*/

  //로그인 시도 함수
  tryToLogin(param : any){
    //new Observable은 행동을 만드는 것 입니다. 내부의 arg는 구독자에게 전달할 행동을 정의합니다.
    return new Observable( arg=>{ 
      if(param.id == this.storage.id && param.pwd == this.storage.pwd){
        arg.next({status: true}); //성공, next를 호출하면서 구독자에게 json형식의 파라미터를 전달 하도록
        //console.log(param);
        localStorage.setItem('status', 'true');
      } else {
        arg.next({status: false, reason: 'wrong information'}); //실패
        //console.log(param);
      }
      arg.complete(); //complete를 호출하면 구독자에게 행위가 끝났음을 알립니다.
    })
  }

  //guard가 구독하는 대상
  readonly isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  //로그인 되어 있는지 확인 함수
  isLogIn() : void{
    if(localStorage.getItem('status')=='true'){
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }
}
