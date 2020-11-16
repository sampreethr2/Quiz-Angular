import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  getQuestionUrl = "http://localhost:3000/Quiz"
  postAnswers = "http://localhost:3000/userAnswers"
  newarr : any;
  constructor(private httpServer: HttpClient) { }

  // getAll() {
  //   return [
  //     { id: 'data/db.json', name: 'Javascript Quiz' }
  //   ];
  // }

  getDataFromJsonServer() {
    return this.httpServer.get(this.getQuestionUrl)
    .pipe(map((res:any)=>{
      // console.log(res)
      return res;
    }));
  }


  

  postAnswerstoJson(arr){
    this.newarr = {"1": arr}
    return this.httpServer.post(this.postAnswers, this.newarr)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}
