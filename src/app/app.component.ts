import { Component } from '@angular/core';
import { validate, PERSON_SCHEMA_ID } from './schema/schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'reactive-forms';
  schema = PERSON_SCHEMA_ID;
  payload = { firstName: '', lastName: '', age: 5, address: '' };

  onQuestionChange(event){
    if(event.name === 'lastName'){
      event.payload.firstName = 'Eduardo';
    }
  }

  onButtonClick(event){
    console.log(this.payload);
    console.log(validate(PERSON_SCHEMA_ID, this.payload));
  }

  onButtonClick2(event) {
    this.payload.firstName = 'Jhon';
  }

}
