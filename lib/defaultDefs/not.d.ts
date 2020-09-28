import type { SanivaliDefaultRuleSchema } from '../defaultDefsTypes';
import type { ISanivaliDef } from '../types';
import type { Sanivali } from '../sanivali';
export declare type NotParam<T = SanivaliDefaultRuleSchema> = T | Sanivali;
export declare type NotRuleItem<T = SanivaliDefaultRuleSchema> = ['not', NotParam<T>];
export declare const notDef: ISanivaliDef;
//# sourceMappingURL=not.d.ts.map