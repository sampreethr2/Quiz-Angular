import { QuizComponent } from './../../quiz/quiz.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  getUserAnswers = "http://localhost:3000/userAnswers"
  getQuestionUrl = "http://localhost:3000/Quiz"
  clearAnswers = "http://localhost:3000/userAnswers/1"

  constructor(private httpServer: HttpClient) { }

  getDataFromJsonServer() {
    return this.httpServer.get(this.getQuestionUrl)
    .pipe(map((res:any)=>{
      // console.log(res)
      return res;
    }));
  }


  getData(){
    return this.httpServer.get(this.getUserAnswers)
    .pipe(map((res:any)=>{
      // console.log(res)
      return res;
    }));
  }

  clearData(){
    return this.httpServer.delete(this.clearAnswers)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

}
