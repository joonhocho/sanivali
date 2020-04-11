import { anyOfDef, AnyOfParam, AnyOfRuleItem } from './defaultDefs/anyOf';
import {
  defaultDef,
  DefaultParam,
  DefaultRuleItem,
} from './defaultDefs/default';
import {
  defaultPropertiesDef,
  DefaultPropertiesParam,
  DefaultPropertiesRuleItem,
} from './defaultDefs/defaultProperties';
import {
  deletePropertiesDef,
  DeletePropertiesParam,
  DeletePropertiesRuleItem,
} from './defaultDefs/deleteProperties';
import {
  dependenciesDef,
  DependenciesParam,
  DependenciesRuleItem,
} from './defaultDefs/dependencies';
import {
  emptyToNullDef,
  EmptyToNullParam,
  EmptyToNullRuleItem,
} from './defaultDefs/emptyToNull';
import { constDef, ConstParam, ConstRuleItem } from './defaultDefs/const';
import { enumDef, EnumParam, EnumRuleItem } from './defaultDefs/enum';
import {
  exclusiveMaximumDef,
  ExclusiveMaximumParam,
  ExclusiveMaximumRuleItem,
} from './defaultDefs/exclusiveMaximum';
import {
  exclusiveMinimumDef,
  ExclusiveMinimumParam,
  ExclusiveMinimumRuleItem,
} from './defaultDefs/exclusiveMinimum';
import {
  filterItemsDef,
  FilterItemsParam,
  FilterItemsRuleItem,
} from './defaultDefs/filterItems';
import {
  filterPropertiesDef,
  FilterPropertiesParam,
  FilterPropertiesRuleItem,
} from './defaultDefs/filterProperties';
import { finiteDef, FiniteParam, FiniteRuleItem } from './defaultDefs/finite';
import { ifElseDef, IfElseParam, IfElseRuleItem } from './defaultDefs/ifElse';
import {
  instanceDef,
  InstanceParam,
  InstanceRuleItem,
} from './defaultDefs/instance';
import {
  integerDef,
  IntegerParam,
  IntegerRuleItem,
} from './defaultDefs/integer';
import {
  invalidDef,
  InvalidParam,
  InvalidRuleItem,
} from './defaultDefs/invalid';
import { itemsDef, ItemsParam, ItemsRuleItem } from './defaultDefs/items';
import {
  maximumDef,
  MaximumParam,
  MaximumRuleItem,
} from './defaultDefs/maximum';
import {
  maxItemsDef,
  MaxItemsParam,
  MaxItemsRuleItem,
} from './defaultDefs/maxItems';
import {
  maxLengthDef,
  MaxLengthParam,
  MaxLengthRuleItem,
} from './defaultDefs/maxLength';
import {
  maxPropertiesDef,
  MaxPropertiesParam,
  MaxPropertiesRuleItem,
} from './defaultDefs/maxProperties';
import {
  minimumDef,
  MinimumParam,
  MinimumRuleItem,
} from './defaultDefs/minimum';
import {
  minItemsDef,
  MinItemsParam,
  MinItemsRuleItem,
} from './defaultDefs/minItems';
import {
  minLengthDef,
  MinLengthParam,
  MinLengthRuleItem,
} from './defaultDefs/minLength';
import {
  minPropertiesDef,
  MinPropertiesParam,
  MinPropertiesRuleItem,
} from './defaultDefs/minProperties';
import {
  notEmptyDef,
  NotEmptyParam,
  NotEmptyRuleItem,
} from './defaultDefs/notEmpty';
import {
  parseFloatDef,
  ParseFloatParam,
  ParseFloatRuleItem,
} from './defaultDefs/parseFloat';
import {
  parseIntDef,
  ParseIntParam,
  ParseIntRuleItem,
} from './defaultDefs/parseInt';
import {
  patternDef,
  PatternParam,
  PatternRuleItem,
} from './defaultDefs/pattern';
import {
  propertiesDef,
  PropertiesParam,
  PropertiesRuleItem,
} from './defaultDefs/properties';
import {
  removeDuplicateItemsDef,
  RemoveDuplicateItemsParam,
  RemoveDuplicateItemsRuleItem,
} from './defaultDefs/removeDuplicateItems';
import {
  removeItemsDef,
  RemoveItemsParam,
  RemoveItemsRuleItem,
} from './defaultDefs/removeItems';
import {
  requiredDef,
  RequiredParam,
  RequiredRuleItem,
} from './defaultDefs/required';
import {
  safeIntegerDef,
  SafeIntegerParam,
  SafeIntegerRuleItem,
} from './defaultDefs/safeInteger';
import { toDateDef, ToDateParam, ToDateRuleItem } from './defaultDefs/toDate';
import {
  toLocaleLowerCaseDef,
  ToLocaleLowerCaseParam,
  ToLocaleLowerCaseRuleItem,
} from './defaultDefs/toLocaleLowerCase';
import {
  toLocaleUpperCaseDef,
  ToLocaleUpperCaseParam,
  ToLocaleUpperCaseRuleItem,
} from './defaultDefs/toLocaleUpperCase';
import {
  toLowerCaseDef,
  ToLowerCaseParam,
  ToLowerCaseRuleItem,
} from './defaultDefs/toLowerCase';
import {
  toTimestampDef,
  ToTimestampParam,
  ToTimestampRuleItem,
} from './defaultDefs/toTimestamp';
import {
  toUpperCaseDef,
  ToUpperCaseParam,
  ToUpperCaseRuleItem,
} from './defaultDefs/toUpperCase';
import { trimDef, TrimParam, TrimRuleItem } from './defaultDefs/trim';
import {
  trimLeftDef,
  TrimLeftParam,
  TrimLeftRuleItem,
} from './defaultDefs/trimLeft';
import {
  trimRightDef,
  TrimRightParam,
  TrimRightRuleItem,
} from './defaultDefs/trimRight';
import {
  trimToNullDef,
  TrimToNullParam,
  TrimToNullRuleItem,
} from './defaultDefs/trimToNull';
import { typeDef, TypeParam, TypeRuleItem } from './defaultDefs/type';
import {
  uniqueItemsDef,
  UniqueItemsParam,
  UniqueItemsRuleItem,
} from './defaultDefs/uniqueItems';
import { validDef, ValidParam, ValidRuleItem } from './defaultDefs/valid';
import { ISanivaliDefMap } from './types';

import type { Sanivali } from './sanivali';

export const defaultDefs: ISanivaliDefMap = {
  // general sanitizers
  default: defaultDef,
  emptyToNull: emptyToNullDef,

  // general validators
  valid: validDef,
  invalid: invalidDef,
  type: typeDef,
  instance: instanceDef,
  const: constDef,
  enum: enumDef,

  // number sanitizers
  parseInt: parseIntDef,
  parseFloat: parseFloatDef,

  // number validators
  finite: finiteDef,
  integer: integerDef,
  safeInteger: safeIntegerDef,
  minimum: minimumDef,
  exclusiveMinimum: exclusiveMinimumDef,

  maximum: maximumDef,
  exclusiveMaximum: exclusiveMaximumDef,

  // string sanitizers
  trim: trimDef,
  trimLeft: trimLeftDef,
  trimRight: trimRightDef,
  trimToNull: trimToNullDef,

  toLocaleLowerCase: toLocaleLowerCaseDef,
  toLocaleUpperCase: toLocaleUpperCaseDef,
  toLowerCase: toLowerCaseDef,
  toUpperCase: toUpperCaseDef,

  // string validators
  minLength: minLengthDef,
  maxLength: maxLengthDef,
  pattern: patternDef,

  // date sanitizer
  toDate: toDateDef,
  toTimestamp: toTimestampDef,

  // array sanitizers
  filterItems: filterItemsDef,
  removeDuplicateItems: removeDuplicateItemsDef,
  removeItems: removeItemsDef,

  // array validators
  minItems: minItemsDef,
  maxItems: maxItemsDef,
  uniqueItems: uniqueItemsDef,
  items: itemsDef,

  // object sanitizer
  defaultProperties: defaultPropertiesDef,
  filterProperties: filterPropertiesDef,
  deleteProperties: deletePropertiesDef,

  // object validators
  required: requiredDef,
  notEmpty: notEmptyDef,
  minProperties: minPropertiesDef,
  maxProperties: maxPropertiesDef,
  dependencies: dependenciesDef,
  properties: propertiesDef,

  // combining
  anyOf: anyOfDef,

  // conditional
  ifElse: ifElseDef,
};

export interface ISanivaliDefaultRuleMap<T = any> {
  // general sanitizers
  default?: DefaultParam;
  emptyToNull?: EmptyToNullParam;

  // general validators
  valid?: ValidParam;
  invalid?: InvalidParam;
  type?: TypeParam;
  instance?: InstanceParam;
  const?: ConstParam;
  enum?: EnumParam;

  // number sanitizers
  parseInt?: ParseIntParam;
  parseFloat?: ParseFloatParam;

  // number validators
  finite?: FiniteParam;
  integer?: IntegerParam;
  safeInteger?: SafeIntegerParam;
  minimum?: MinimumParam;
  exclusiveMinimum?: ExclusiveMinimumParam;

  maximum?: MaximumParam;
  exclusiveMaximum?: ExclusiveMaximumParam;

  // string sanitizers
  trim?: TrimParam;
  trimLeft?: TrimLeftParam;
  trimRight?: TrimRightParam;
  trimToNull?: TrimToNullParam;

  toLocaleLowerCase?: ToLocaleLowerCaseParam;
  toLocaleUpperCase?: ToLocaleUpperCaseParam;
  toLowerCase?: ToLowerCaseParam;
  toUpperCase?: ToUpperCaseParam;

  // string validators
  minLength?: MinLengthParam;
  maxLength?: MaxLengthParam;
  pattern?: PatternParam;

  // date sanitizer
  toDate?: ToDateParam;
  toTimestamp?: ToTimestampParam;

  // array sanitizers
  filterItems?: FilterItemsParam;
  removeDuplicateItems?: RemoveDuplicateItemsParam;
  removeItems?: RemoveItemsParam;

  // array validators
  minItems?: MinItemsParam;
  maxItems?: MaxItemsParam;
  uniqueItems?: UniqueItemsParam;
  items?: ItemsParam<T>;

  // object sanitizer
  defaultProperties?: DefaultPropertiesParam;
  filterProperties?: FilterPropertiesParam;
  deleteProperties?: DeletePropertiesParam;

  // object validators
  required?: RequiredParam;
  notEmpty?: NotEmptyParam;
  minProperties?: MinPropertiesParam;
  maxProperties?: MaxPropertiesParam;
  dependencies?: DependenciesParam;
  properties?: PropertiesParam<T>;

  // combining
  anyOf?: AnyOfParam<T>;

  // conditional
  ifElse?: IfElseParam<T>;
}

export type SanivaliDefaultRuleItem<T = any> =
  // general sanitizers
  | DefaultRuleItem
  | EmptyToNullRuleItem

  // general validators
  | ValidRuleItem
  | InvalidRuleItem
  | TypeRuleItem
  | InstanceRuleItem
  | ConstRuleItem
  | EnumRuleItem

  // number sanitizers
  | ParseIntRuleItem
  | ParseFloatRuleItem

  // number validators
  | FiniteRuleItem
  | IntegerRuleItem
  | SafeIntegerRuleItem
  | MinimumRuleItem
  | ExclusiveMinimumRuleItem
  | MaximumRuleItem
  | ExclusiveMaximumRuleItem

  // string sanitizers
  | TrimRuleItem
  | TrimLeftRuleItem
  | TrimRightRuleItem
  | TrimToNullRuleItem
  | ToLocaleLowerCaseRuleItem
  | ToLocaleUpperCaseRuleItem
  | ToLowerCaseRuleItem
  | ToUpperCaseRuleItem

  // string validators
  | MinLengthRuleItem
  | MaxLengthRuleItem
  | PatternRuleItem

  // date sanitizer
  | ToDateRuleItem
  | ToTimestampRuleItem

  // array sanitizers
  | FilterItemsRuleItem
  | RemoveDuplicateItemsRuleItem
  | RemoveItemsRuleItem

  // array validators
  | MinItemsRuleItem
  | MaxItemsRuleItem
  | UniqueItemsRuleItem
  | ItemsRuleItem<T>

  // object sanitizer
  | DefaultPropertiesRuleItem
  | FilterPropertiesRuleItem
  | DeletePropertiesRuleItem

  // object validators
  | RequiredRuleItem
  | NotEmptyRuleItem
  | MinPropertiesRuleItem
  | MaxPropertiesRuleItem
  | DependenciesRuleItem
  | PropertiesRuleItem<T>

  // combining
  | AnyOfRuleItem<T>

  // conditional
  | IfElseRuleItem<T>;

export type SanivaliDefaultRuleSchema<T = any> =
  | ISanivaliDefaultRuleMap<T>
  | Array<SanivaliDefaultRuleItem<T> | Sanivali<any, any>>;
