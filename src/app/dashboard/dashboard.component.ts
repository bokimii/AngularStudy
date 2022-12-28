import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private file : any;
  private path = "good/";

  constructor(private storage: AngularFireStorage){

  }

  ngOnInit(): void {
    
  }

  uploadFile(event : any){
    this.file = event.target.files[0]; //input type file에서의 변화가 생기면 해당 변화된 데이터를 file이라는 변수에 담았습니다.
  }

  send(){
    const ref = this.storage.upload(this.path + this.file.name, this.file); //저장할 파일경로+이름, 저장할 파일데이터
    console.log(ref);
  }
}
