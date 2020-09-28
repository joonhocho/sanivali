import type { SanivaliDefaultRuleSchema } from '../defaultDefsTypes';
import type { ISanivaliDef } from '../types';
import type { Sanivali } from '../sanivali';
export declare type AnyOfParam<T = SanivaliDefaultRuleSchema> = Array<T | Sanivali>;
export declare type AnyOfRuleItem<T = SanivaliDefaultRuleSchema> = [
    'anyOf',
    AnyOfParam<T>
];
export declare const anyOfDef: ISanivaliDef;
//# sourceMappingURL=anyOf.d.ts.map