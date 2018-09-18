import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {

    @Input() options: {};
    @Input() control: FormControl;

    ngOnInit(){
      console.log(this.control);
    }
  
}