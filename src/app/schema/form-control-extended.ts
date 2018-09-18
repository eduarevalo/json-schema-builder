import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

export class FormControlExtended<T> extends FormControl {
  
  constructor(
    private type,
    validatorOrOpts?: ValidatorFn|ValidatorFn[]|AbstractControlOptions|null,
    asyncValidator?: AsyncValidatorFn|AsyncValidatorFn[]|null) {
    super(null, validatorOrOpts, asyncValidator);
  }

  setValue(value: any, options: {
    onlySelf?: boolean,
    emitEvent?: boolean,
    emitModelToViewChange?: boolean,
    emitViewToModelChange?: boolean
  } = {}): void {
    if (this.type === Boolean) {
      return super.setValue(value ? Boolean(value) : undefined, options);
    } else if (this.type === Number) {
      return super.setValue(value ? +value : undefined, options);
    }
    return super.setValue(value ? value : undefined, options);
  }

}