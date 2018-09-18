import * as addressSchema from './address.schema.json';
import * as personSchema from './person.schema.json';
import * as Ajv from 'ajv';

export const ADDRESS_SCHEMA = addressSchema.default;
export const PERSON_SCHEMA = personSchema.default;
export const ADDRESS_SCHEMA_ID = ADDRESS_SCHEMA.$id;
export const PERSON_SCHEMA_ID = PERSON_SCHEMA.$id;

const ajv = new Ajv();
ajv.addSchema(ADDRESS_SCHEMA, ADDRESS_SCHEMA_ID);
ajv.addSchema(PERSON_SCHEMA, PERSON_SCHEMA_ID);

export function validate(schema, payload): boolean {
    var valid = ajv.validate(schema, payload);
    if (!valid) console.log(ajv.errors);
    return !!valid;
}

export function getSchema(schemaId){
    return ajv.getSchema(schemaId).schema;
}
