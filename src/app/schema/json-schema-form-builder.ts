import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { getSchema } from './schema';

import { FormControlExtended } from './form-control-extended';

const VALIDATORS_MAPPING = {
    required: (property, name, schema): ValidatorFn => schema.required.find( reqProp => name === reqProp ) ? Validators.required : null,
    maximum: (property): ValidatorFn => property.maximum ? Validators.max(property.maximum) : null,
    minimum: (property): ValidatorFn => property.minimum ? Validators.min(property.minimum) : null,
    maxLength: (property): ValidatorFn => property.maxLength ? Validators.maxLength(property.maxLength) : null
}

export class JsonSchemaFormBuilder {

    static build(schemaId): { form: FormGroup, questions: any } {

        const schema: any = getSchema(schemaId),
            questions = {};
        
        let group: any = {};

        Object.keys(schema.properties).forEach( name => {

            const type = schema.properties[name].type;

            const validators = Object
                .values(VALIDATORS_MAPPING)
                .map( validator => validator(schema.properties[name], name, schema))
                .filter( validator => validator );

            group[name] = type === "number"
                ? new FormControlExtended<Number>(Number, validators)
                : type === "boolean"
                ? new FormControlExtended<Boolean>(Boolean, validators)
                : new FormControlExtended<String>(String, validators);

            questions[name] = { type, name };

        });

        return { form: new FormGroup(group), questions };
    }

}