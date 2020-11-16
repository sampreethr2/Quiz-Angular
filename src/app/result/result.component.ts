import { QuizService } from './../quiz.service';
import { Router } from '@angular/router';
import { QuizComponent } from './../quiz/quiz.component';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ResultService } from './service/result.service'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  selectedarray: any;
  userAnswers: any
  answerdata: any;
  questiondata: Subscription;
  question: any;
  percentage = 0;
  userPercentage : Number;
  index = 0;
  posCount = 0
  negCount = 0
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  constructor(private resultService: ResultService, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.getAnswerData()
    
    this.questiondata = this.resultService.getDataFromJsonServer()
      .subscribe((sol:any)=>{
        this.question = sol[0];
        this.pager.count = sol[0].questions.length;
        // console.log("question: "+this.question)
      })
      // this.userPercentage = this.getPercentage(this.userAnswers)
     
      
    
  }

  getAnswerData(){
    this.answerdata = this.resultService.getData()
    .subscribe((res: any) => {
      // console.log(res)
      this.userAnswers = res
      // console.log(this.userAnswers[0][1][0])
    })
  }

  isValid(index: number): boolean {

    if (index<this.pager.count) {
      this.index+=1
      // console.log(this.index)
      return true
    } else {
      return false
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    } 
  }

  clearAndGetHome(){
    this.answerdata = this.resultService.clearData()
      .subscribe((res: any) => {
        console.log(res)
        this.userAnswers = res
        // console.log(this.userAnswers)
      })
      this.router.navigate([''])  


  }
  getPercentage(){
    for(let i=0;i<this.userAnswers[0][1].length;i++){
      if(this.userAnswers[0][1][i]==true){
      this.percentage+=1
    }
    }
    this.userPercentage = (this.percentage/this.userAnswers[0][1].length)*100
  }


}
