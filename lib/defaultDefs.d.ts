import { AnyOfParam, AnyOfRuleItem } from './defaultDefs/anyOf';
import { NotParam, NotRuleItem } from './defaultDefs/not';
import { DefaultParam, DefaultRuleItem } from './defaultDefs/default';
import { DefaultPropertiesParam, DefaultPropertiesRuleItem } from './defaultDefs/defaultProperties';
import { DeletePropertiesParam, DeletePropertiesRuleItem } from './defaultDefs/deleteProperties';
import { DependenciesParam, DependenciesRuleItem } from './defaultDefs/dependencies';
import { EmptyToNullParam, EmptyToNullRuleItem } from './defaultDefs/emptyToNull';
import { ToConstParam, ToConstRuleItem } from './defaultDefs/toConst';
import { ConstParam, ConstRuleItem } from './defaultDefs/const';
import { EnumParam, EnumRuleItem } from './defaultDefs/enum';
import { ExclusiveMaximumParam, ExclusiveMaximumRuleItem } from './defaultDefs/exclusiveMaximum';
import { ExclusiveMinimumParam, ExclusiveMinimumRuleItem } from './defaultDefs/exclusiveMinimum';
import { FilterItemsParam, FilterItemsRuleItem } from './defaultDefs/filterItems';
import { FilterPropertiesParam, FilterPropertiesRuleItem } from './defaultDefs/filterProperties';
import { FiniteParam, FiniteRuleItem } from './defaultDefs/finite';
import { IfElseParam, IfElseRuleItem } from './defaultDefs/ifElse';
import { InstanceParam, InstanceRuleItem } from './defaultDefs/instance';
import { IntegerParam, IntegerRuleItem } from './defaultDefs/integer';
import { InvalidParam, InvalidRuleItem } from './defaultDefs/invalid';
import { ItemsParam, ItemsRuleItem } from './defaultDefs/items';
import { MaximumParam, MaximumRuleItem } from './defaultDefs/maximum';
import { MaxItemsParam, MaxItemsRuleItem } from './defaultDefs/maxItems';
import { MaxLengthParam, MaxLengthRuleItem } from './defaultDefs/maxLength';
import { MaxPropertiesParam, MaxPropertiesRuleItem } from './defaultDefs/maxProperties';
import { MinimumParam, MinimumRuleItem } from './defaultDefs/minimum';
import { MinItemsParam, MinItemsRuleItem } from './defaultDefs/minItems';
import { MinLengthParam, MinLengthRuleItem } from './defaultDefs/minLength';
import { MinPropertiesParam, MinPropertiesRuleItem } from './defaultDefs/minProperties';
import { NotEmptyParam, NotEmptyRuleItem } from './defaultDefs/notEmpty';
import { ParseFloatParam, ParseFloatRuleItem } from './defaultDefs/parseFloat';
import { ParseIntParam, ParseIntRuleItem } from './defaultDefs/parseInt';
import { PatternParam, PatternRuleItem } from './defaultDefs/pattern';
import { PropertiesParam, PropertiesRuleItem } from './defaultDefs/properties';
import { RemoveDuplicateItemsParam, RemoveDuplicateItemsRuleItem } from './defaultDefs/removeDuplicateItems';
import { RemoveItemsParam, RemoveItemsRuleItem } from './defaultDefs/removeItems';
import { RequiredParam, RequiredRuleItem } from './defaultDefs/required';
import { SafeIntegerParam, SafeIntegerRuleItem } from './defaultDefs/safeInteger';
import { ToDateParam, ToDateRuleItem } from './defaultDefs/toDate';
import { ToLocaleLowerCaseParam, ToLocaleLowerCaseRuleItem } from './defaultDefs/toLocaleLowerCase';
import { ToLocaleUpperCaseParam, ToLocaleUpperCaseRuleItem } from './defaultDefs/toLocaleUpperCase';
import { ToLowerCaseParam, ToLowerCaseRuleItem } from './defaultDefs/toLowerCase';
import { ToTimestampParam, ToTimestampRuleItem } from './defaultDefs/toTimestamp';
import { ToUpperCaseParam, ToUpperCaseRuleItem } from './defaultDefs/toUpperCase';
import { TrimParam, TrimRuleItem } from './defaultDefs/trim';
import { TrimLeftParam, TrimLeftRuleItem } from './defaultDefs/trimLeft';
import { TrimRightParam, TrimRightRuleItem } from './defaultDefs/trimRight';
import { TrimToNullParam, TrimToNullRuleItem } from './defaultDefs/trimToNull';
import { TypeParam, TypeRuleItem } from './defaultDefs/type';
import { UniqueItemsParam, UniqueItemsRuleItem } from './defaultDefs/uniqueItems';
import { ValidParam, ValidRuleItem } from './defaultDefs/valid';
import { ISanivaliDefMap } from './types';
import type { Sanivali } from './sanivali';
export declare const defaultDefs: ISanivaliDefMap;
export interface ISanivaliDefaultRuleMap<T = any> {
    default?: DefaultParam;
    toConst?: ToConstParam;
    emptyToNull?: EmptyToNullParam;
    valid?: ValidParam;
    invalid?: InvalidParam;
    type?: TypeParam;
    instance?: InstanceParam;
    const?: ConstParam;
    enum?: EnumParam;
    parseInt?: ParseIntParam;
    parseFloat?: ParseFloatParam;
    finite?: FiniteParam;
    integer?: IntegerParam;
    safeInteger?: SafeIntegerParam;
    minimum?: MinimumParam;
    exclusiveMinimum?: ExclusiveMinimumParam;
    maximum?: MaximumParam;
    exclusiveMaximum?: ExclusiveMaximumParam;
    trim?: TrimParam;
    trimLeft?: TrimLeftParam;
    trimRight?: TrimRightParam;
    trimToNull?: TrimToNullParam;
    toLocaleLowerCase?: ToLocaleLowerCaseParam;
    toLocaleUpperCase?: ToLocaleUpperCaseParam;
    toLowerCase?: ToLowerCaseParam;
    toUpperCase?: ToUpperCaseParam;
    minLength?: MinLengthParam;
    maxLength?: MaxLengthParam;
    pattern?: PatternParam;
    toDate?: ToDateParam;
    toTimestamp?: ToTimestampParam;
    filterItems?: FilterItemsParam;
    removeDuplicateItems?: RemoveDuplicateItemsParam;
    removeItems?: RemoveItemsParam;
    minItems?: MinItemsParam;
    maxItems?: MaxItemsParam;
    uniqueItems?: UniqueItemsParam;
    items?: ItemsParam<T>;
    defaultProperties?: DefaultPropertiesParam;
    filterProperties?: FilterPropertiesParam;
    deleteProperties?: DeletePropertiesParam;
    required?: RequiredParam;
    notEmpty?: NotEmptyParam;
    minProperties?: MinPropertiesParam;
    maxProperties?: MaxPropertiesParam;
    dependencies?: DependenciesParam;
    properties?: PropertiesParam<T>;
    anyOf?: AnyOfParam<T>;
    not?: NotParam<T>;
    ifElse?: IfElseParam<T>;
}
export declare type SanivaliDefaultRuleItem<T = any> = DefaultRuleItem | ToConstRuleItem | EmptyToNullRuleItem | ValidRuleItem | InvalidRuleItem | TypeRuleItem | InstanceRuleItem | ConstRuleItem | EnumRuleItem | ParseIntRuleItem | ParseFloatRuleItem | FiniteRuleItem | IntegerRuleItem | SafeIntegerRuleItem | MinimumRuleItem | ExclusiveMinimumRuleItem | MaximumRuleItem | ExclusiveMaximumRuleItem | TrimRuleItem | TrimLeftRuleItem | TrimRightRuleItem | TrimToNullRuleItem | ToLocaleLowerCaseRuleItem | ToLocaleUpperCaseRuleItem | ToLowerCaseRuleItem | ToUpperCaseRuleItem | MinLengthRuleItem | MaxLengthRuleItem | PatternRuleItem | ToDateRuleItem | ToTimestampRuleItem | FilterItemsRuleItem | RemoveDuplicateItemsRuleItem | RemoveItemsRuleItem | MinItemsRuleItem | MaxItemsRuleItem | UniqueItemsRuleItem | ItemsRuleItem<T> | DefaultPropertiesRuleItem | FilterPropertiesRuleItem | DeletePropertiesRuleItem | RequiredRuleItem | NotEmptyRuleItem | MinPropertiesRuleItem | MaxPropertiesRuleItem | DependenciesRuleItem | PropertiesRuleItem<T> | AnyOfRuleItem<T> | NotRuleItem<T> | IfElseRuleItem<T>;
export declare type SanivaliDefaultRuleSchema<T = any> = ISanivaliDefaultRuleMap<T> | Array<SanivaliDefaultRuleItem<T> | Sanivali<any, any>>;
//# sourceMappingURL=defaultDefs.d.ts.map