import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators }        from '@angular/forms';

import { JsonSchemaFormBuilder } from './../schema/json-schema-form-builder';

interface QuestionChangeUpdate {
    name: string;
    value: any;
    payload: any;
}; 

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  @Input() schema;

  @Input() payload;
  @Output() payloadChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() questionChange: EventEmitter<QuestionChangeUpdate> = new EventEmitter<QuestionChangeUpdate>();

  form;
  questions;

  handler = {
    set: (target, path, value): boolean => {
      debugger;
      this.form.controls[path].setValue(value);
      return true;
    }
  };

  proxy;

  ngOnInit(){
    const jsonForm = JsonSchemaFormBuilder.build(this.schema);
    this.form = jsonForm.form; 
    this.questions = jsonForm.questions;
    this.proxy = new Proxy(this.payload, this.handler);
    this.form.setValue(this.payload);
    this.form.valueChanges.subscribe( data => {
      this.payloadChange.emit(data);
    });
    Object.keys(this.form.controls).forEach( name => this.subscribeToChanges(name) );
  }

  /*buttonClick(){
      this.setValidators('firstName', null);
  }

  buttonClick2(){
    this.setValidators('firstName', [Validators.maxLength(5)]);
  }

  buttonClick3(){
    this.subscribeToChanges('lastName');
  }*/

  subscribeToChanges(name){
    this.form.controls[name].valueChanges.subscribe( value => {
        this.questionChange.emit({name, value, payload: this.proxy });
    });
  }

  setValidators(name, validators) {
      var control = new FormControl(this.form.controls[name].value, validators);
      this.form.setControl(name, control);
  }

  get sortedQuestions() { return Object.keys(this.form.controls).sort(); }

  getControl(name) { return this.form.controls[name]; }
  
  getOptions(name) { return this.questions[name]; } 
  
  get isValid() { return this.form.valid; }

  trackByName(index, item) {
    return item.name;
  }

}