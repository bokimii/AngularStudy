import { Component } from '@angular/core';
import { AskService } from './ask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thirdStudy';

  constructor(private service : AskService){
    service.addItem("board", {number:5,hello:'hello',today:new Date()});
    service.getItem("board").valueChanges().subscribe((arg: any) => {
      console.log(arg);
    })
  }
}
