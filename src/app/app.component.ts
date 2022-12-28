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
    //service.addItem("board", {number:5,hello:'hello',today:new Date()}); //등록
    
    service.getItem("board").valueChanges({idField : 'idx'}).subscribe((arg: any) => { //idField값에 idx를 부여하였습니다.
      console.log(arg);
    });

    //service.updateData('board', {number : 13, new_text:'hello updater12'}, 'PgZdZArf6ToOk2vwW7Pq');
    //service.updateData2('board', {number : 13, new_text:'hello updater12'}, 'PgZdZArf6ToOk2vwW7Pq');
    //service.updateData3('board', {new_text:'하잇'}, 'PgZdZArf6ToOk2vwW7Pq');
    
    //service.testPipeTake();  //추가!

    //service.deleteData('board','PgZdZArf6ToOk2vwW7Pq');
  }
}
