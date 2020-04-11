import { ISanivaliDef } from '../types';
export declare type DataType = 'array' | 'bigint' | 'boolean' | 'function' | 'integer' | 'nil' | 'null' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
export declare type TypeParam = DataType | DataType[];
export declare type TypeRuleItem = ['type', TypeParam];
export declare const typeDef: ISanivaliDef;
//# sourceMappingURL=type.d.ts.map