import { QuizService } from './../quiz.service';
import { ResultService } from './../result/service/result.service';
import { Component, OnInit } from '@angular/core';
// import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  selectedarray: any;
  solutionarray: any;
  selected: any;
  question: any;
  data?: Subscription;
  postAnswers: Subscription;
  updateNext = false;
  finalQues = true;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  correctAnswers = 0;
  constructor(private quizService: QuizService, private router: Router, private resultService: ResultService) { }

  ngOnInit(): void {
    console.log(this.selected)
    this.data = this.quizService.getDataFromJsonServer()
      .subscribe((res: any) => {
        this.question = res[0];
        // console.log(res[0].questions.length)
        this.pager.count = res[0].questions.length;
        this.solutionarray = Array(this.pager.count).fill({ val: 0 });
        this.selectedarray = Array(this.pager.count).fill(false)
        // this.resultService.userSolutionArr.subscribe(selectedarray => this.selectedarray = this.selectedarray)

        for (let i = 0; i < this.pager.count; i++) {
          for (let j = 0; j < this.question.questions[i].choices.length; j++) {
            if (this.question.questions[i].choices[j].isAnswer == true) {
              this.solutionarray[i] = this.question.questions[i].choices[j].id;
            }
          }
        }
      });
  }
  isLast(index): Boolean {
    if (index == this.pager.count - 1) {
      this.finalQues=false
      return true
    }
    else {
      return false
    }
  }

  onSelect(index, selected) {
    this.updateNext = true;
    if (selected === this.solutionarray[index]) {
      this.correctAnswers += 1;
      this.selectedarray[index] = true;
    } else {
      this.selectedarray[index] = false;
    }
  }

  goToResult() {
    // console.log("submit click")
    // console.log("In Sending result array " + this.selectedarray )
    this.postAnswers = this.quizService.postAnswerstoJson(this.selectedarray)
      .subscribe((res: any) => {
        console.log(res)
      })
    this.router.navigate(['/result'])
  }


  goTo(index: number) {
    // window.location.reload()

    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    }
    // location.reload()
    this.updateNext = false;
    this.selected = undefined;
  }
}
