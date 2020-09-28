import type { SanivaliDefaultRuleSchema } from '../defaultDefsTypes';
import type { ISanivaliDef } from '../types';
import type { Sanivali } from '../sanivali';
export declare type AllOfParam<T = SanivaliDefaultRuleSchema> = Array<T | Sanivali>;
export declare type AllOfRuleItem<T = SanivaliDefaultRuleSchema> = [
    'allOf',
    AllOfParam<T>
];
export declare const allOfDef: ISanivaliDef;
//# sourceMappingURL=allOf.d.ts.map