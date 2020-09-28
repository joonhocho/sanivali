import type { AllOfParam, AllOfRuleItem } from './defaultDefs/allOf';
import type { AnyOfParam, AnyOfRuleItem } from './defaultDefs/anyOf';
import type { ConstParam, ConstRuleItem } from './defaultDefs/const';
import type { DefaultParam, DefaultRuleItem } from './defaultDefs/default';
import type {
  DefaultPropertiesParam,
  DefaultPropertiesRuleItem,
} from './defaultDefs/defaultProperties';
import type {
  DeletePropertiesParam,
  DeletePropertiesRuleItem,
} from './defaultDefs/deleteProperties';
import type {
  DependenciesParam,
  DependenciesRuleItem,
} from './defaultDefs/dependencies';
import type {
  EmptyToNullParam,
  EmptyToNullRuleItem,
} from './defaultDefs/emptyToNull';
import type { EnumParam, EnumRuleItem } from './defaultDefs/enum';
import type {
  ExclusiveMaximumParam,
  ExclusiveMaximumRuleItem,
} from './defaultDefs/exclusiveMaximum';
import type {
  ExclusiveMinimumParam,
  ExclusiveMinimumRuleItem,
} from './defaultDefs/exclusiveMinimum';
import type {
  FilterItemsParam,
  FilterItemsRuleItem,
} from './defaultDefs/filterItems';
import type {
  FilterPropertiesParam,
  FilterPropertiesRuleItem,
} from './defaultDefs/filterProperties';
import type { FiniteParam, FiniteRuleItem } from './defaultDefs/finite';
import type { IfElseParam, IfElseRuleItem } from './defaultDefs/ifElse';
import type { InstanceParam, InstanceRuleItem } from './defaultDefs/instance';
import type { IntegerParam, IntegerRuleItem } from './defaultDefs/integer';
import type { InvalidParam, InvalidRuleItem } from './defaultDefs/invalid';
import type { ItemsParam, ItemsRuleItem } from './defaultDefs/items';
import type { MaximumParam, MaximumRuleItem } from './defaultDefs/maximum';
import type { MaxItemsParam, MaxItemsRuleItem } from './defaultDefs/maxItems';
import type {
  MaxLengthParam,
  MaxLengthRuleItem,
} from './defaultDefs/maxLength';
import type {
  MaxPropertiesParam,
  MaxPropertiesRuleItem,
} from './defaultDefs/maxProperties';
import type { MinimumParam, MinimumRuleItem } from './defaultDefs/minimum';
import type { MinItemsParam, MinItemsRuleItem } from './defaultDefs/minItems';
import type {
  MinLengthParam,
  MinLengthRuleItem,
} from './defaultDefs/minLength';
import type {
  MinPropertiesParam,
  MinPropertiesRuleItem,
} from './defaultDefs/minProperties';
import type { NotParam, NotRuleItem } from './defaultDefs/not';
import type { NotEmptyParam, NotEmptyRuleItem } from './defaultDefs/notEmpty';
import type {
  ParseFloatParam,
  ParseFloatRuleItem,
} from './defaultDefs/parseFloat';
import type { ParseIntParam, ParseIntRuleItem } from './defaultDefs/parseInt';
import type { PatternParam, PatternRuleItem } from './defaultDefs/pattern';
import type {
  PropertiesParam,
  PropertiesRuleItem,
} from './defaultDefs/properties';
import type {
  RemoveDuplicateItemsParam,
  RemoveDuplicateItemsRuleItem,
} from './defaultDefs/removeDuplicateItems';
import type {
  RemoveItemsParam,
  RemoveItemsRuleItem,
} from './defaultDefs/removeItems';
import type { RequiredParam, RequiredRuleItem } from './defaultDefs/required';
import type {
  SafeIntegerParam,
  SafeIntegerRuleItem,
} from './defaultDefs/safeInteger';
import type { SanitizeParam, SanitizeRuleItem } from './defaultDefs/sanitize';
import type { ToConstParam, ToConstRuleItem } from './defaultDefs/toConst';
import type { ToDateParam, ToDateRuleItem } from './defaultDefs/toDate';
import type {
  ToLocaleLowerCaseParam,
  ToLocaleLowerCaseRuleItem,
} from './defaultDefs/toLocaleLowerCase';
import type {
  ToLocaleUpperCaseParam,
  ToLocaleUpperCaseRuleItem,
} from './defaultDefs/toLocaleUpperCase';
import type {
  ToLowerCaseParam,
  ToLowerCaseRuleItem,
} from './defaultDefs/toLowerCase';
import type {
  ToTimestampParam,
  ToTimestampRuleItem,
} from './defaultDefs/toTimestamp';
import type {
  ToUpperCaseParam,
  ToUpperCaseRuleItem,
} from './defaultDefs/toUpperCase';
import type { TrimParam, TrimRuleItem } from './defaultDefs/trim';
import type { TrimLeftParam, TrimLeftRuleItem } from './defaultDefs/trimLeft';
import type {
  TrimRightParam,
  TrimRightRuleItem,
} from './defaultDefs/trimRight';
import type {
  TrimToNullParam,
  TrimToNullRuleItem,
} from './defaultDefs/trimToNull';
import type { TypeParam, TypeRuleItem } from './defaultDefs/type';
import type {
  UniqueItemsParam,
  UniqueItemsRuleItem,
} from './defaultDefs/uniqueItems';
import type { ValidParam, ValidRuleItem } from './defaultDefs/valid';
import type { ValidateParam, ValidateRuleItem } from './defaultDefs/validate';
import type { Sanivali } from './sanivali';

export interface ISanivaliDefaultRuleMap<T = any> {
  // general sanitizers
  default?: DefaultParam;
  toConst?: ToConstParam;
  emptyToNull?: EmptyToNullParam;
  sanitize?: SanitizeParam;

  // general validators
  valid?: ValidParam;
  invalid?: InvalidParam;
  type?: TypeParam;
  instance?: InstanceParam;
  const?: ConstParam;
  enum?: EnumParam;
  validate?: ValidateParam;

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
  allOf?: AllOfParam<T>;
  anyOf?: AnyOfParam<T>;
  not?: NotParam<T>;

  // conditional
  ifElse?: IfElseParam<T>;
}

export type SanivaliDefaultRuleItem<T = any> =
  // general sanitizers
  | DefaultRuleItem
  | ToConstRuleItem
  | EmptyToNullRuleItem
  | SanitizeRuleItem

  // general validators
  | ValidRuleItem
  | InvalidRuleItem
  | TypeRuleItem
  | InstanceRuleItem
  | ConstRuleItem
  | EnumRuleItem
  | ValidateRuleItem

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
  | AllOfRuleItem<T>
  | AnyOfRuleItem<T>
  | NotRuleItem<T>

  // conditional
  | IfElseRuleItem<T>;

export type SanivaliDefaultRuleSchema<T = any> =
  | ISanivaliDefaultRuleMap<T>
  | Array<SanivaliDefaultRuleItem<T> | Sanivali<any, any>>;
