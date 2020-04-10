import { anyOfDef } from './defaultDefs/anyOf';
import { defaultDef, } from './defaultDefs/default';
import { defaultPropertiesDef, } from './defaultDefs/defaultProperties';
import { deleteNilPropertiesDef, } from './defaultDefs/deleteNilProperties';
import { dependenciesDef, } from './defaultDefs/dependencies';
import { emptyToNullDef, } from './defaultDefs/emptyToNull';
import { enumDef } from './defaultDefs/enum';
import { exclusiveMaximumDef, } from './defaultDefs/exclusiveMaximum';
import { exclusiveMinimumDef, } from './defaultDefs/exclusiveMinimum';
import { filterItemsDef, } from './defaultDefs/filterItems';
import { filterUniqueItemsDef, } from './defaultDefs/filterUniqueItems';
import { filterPropertiesDef, } from './defaultDefs/filterProperties';
import { finiteDef } from './defaultDefs/finite';
import { ifElseDef } from './defaultDefs/ifElse';
import { instanceDef, } from './defaultDefs/instance';
import { integerDef, } from './defaultDefs/integer';
import { invalidDef, } from './defaultDefs/invalid';
import { itemsDef } from './defaultDefs/items';
import { maximumDef, } from './defaultDefs/maximum';
import { maxItemsDef, } from './defaultDefs/maxItems';
import { maxLengthDef, } from './defaultDefs/maxLength';
import { maxPropertiesDef, } from './defaultDefs/maxProperties';
import { minimumDef, } from './defaultDefs/minimum';
import { minItemsDef, } from './defaultDefs/minItems';
import { minLengthDef, } from './defaultDefs/minLength';
import { minPropertiesDef, } from './defaultDefs/minProperties';
import { parseFloatDef, } from './defaultDefs/parseFloat';
import { parseIntDef, } from './defaultDefs/parseInt';
import { patternDef, } from './defaultDefs/pattern';
import { propertiesDef, } from './defaultDefs/properties';
import { removeDuplicateItemsDef, } from './defaultDefs/removeDuplicateItems';
import { removeNilItemsDef, } from './defaultDefs/removeNilItems';
import { requiredDef, } from './defaultDefs/required';
import { notEmptyDef, } from './defaultDefs/notEmpty';
import { safeIntegerDef, } from './defaultDefs/safeInteger';
import { toDateDef } from './defaultDefs/toDate';
import { toLocaleLowerCaseDef, } from './defaultDefs/toLocaleLowerCase';
import { toLocaleUpperCaseDef, } from './defaultDefs/toLocaleUpperCase';
import { toLowerCaseDef, } from './defaultDefs/toLowerCase';
import { toTimestampDef, } from './defaultDefs/toTimestamp';
import { toUpperCaseDef, } from './defaultDefs/toUpperCase';
import { trimDef } from './defaultDefs/trim';
import { trimLeftDef, } from './defaultDefs/trimLeft';
import { trimRightDef, } from './defaultDefs/trimRight';
import { trimToNullDef, } from './defaultDefs/trimToNull';
import { typeDef } from './defaultDefs/type';
import { uniqueItemsDef, } from './defaultDefs/uniqueItems';
import { validDef } from './defaultDefs/valid';
export const defaultDefs = {
    default: defaultDef,
    emptyToNull: emptyToNullDef,
    valid: validDef,
    invalid: invalidDef,
    type: typeDef,
    instance: instanceDef,
    enum: enumDef,
    parseInt: parseIntDef,
    parseFloat: parseFloatDef,
    finite: finiteDef,
    integer: integerDef,
    safeInteger: safeIntegerDef,
    minimum: minimumDef,
    exclusiveMinimum: exclusiveMinimumDef,
    maximum: maximumDef,
    exclusiveMaximum: exclusiveMaximumDef,
    trim: trimDef,
    trimLeft: trimLeftDef,
    trimRight: trimRightDef,
    trimToNull: trimToNullDef,
    toLocaleLowerCase: toLocaleLowerCaseDef,
    toLocaleUpperCase: toLocaleUpperCaseDef,
    toLowerCase: toLowerCaseDef,
    toUpperCase: toUpperCaseDef,
    minLength: minLengthDef,
    maxLength: maxLengthDef,
    pattern: patternDef,
    toDate: toDateDef,
    toTimestamp: toTimestampDef,
    filterItems: filterItemsDef,
    filterUniqueItems: filterUniqueItemsDef,
    removeDuplicateItems: removeDuplicateItemsDef,
    removeNilItems: removeNilItemsDef,
    minItems: minItemsDef,
    maxItems: maxItemsDef,
    uniqueItems: uniqueItemsDef,
    items: itemsDef,
    defaultProperties: defaultPropertiesDef,
    filterProperties: filterPropertiesDef,
    deleteNilProperties: deleteNilPropertiesDef,
    required: requiredDef,
    notEmpty: notEmptyDef,
    minProperties: minPropertiesDef,
    maxProperties: maxPropertiesDef,
    dependencies: dependenciesDef,
    properties: propertiesDef,
    anyOf: anyOfDef,
    ifElse: ifElseDef,
};
//# sourceMappingURL=defaultDefs.js.map