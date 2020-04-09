import { ISanivaliDef } from '../types';
import { Sanivali } from '../sanivali';
import { SanivaliDefaultRuleSchema } from './';
export declare type AnyOfParam<T = SanivaliDefaultRuleSchema> = Array<T | Sanivali>;
export declare type AnyOfRuleItem<T = SanivaliDefaultRuleSchema> = ['anyOf', AnyOfParam<T>];
export declare const anyOfDef: ISanivaliDef;
//# sourceMappingURL=anyOf.d.ts.map