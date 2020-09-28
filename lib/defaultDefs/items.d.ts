import type { SanivaliDefaultRuleSchema } from '../defaultDefsTypes';
import type { ISanivaliDef } from '../types';
import type { Sanivali } from '../sanivali';
export declare type ItemsParam<T = SanivaliDefaultRuleSchema> = T | Sanivali;
export declare type ItemsRuleItem<T = SanivaliDefaultRuleSchema> = [
    'items',
    ItemsParam<T>
];
export declare const itemsDef: ISanivaliDef;
//# sourceMappingURL=items.d.ts.map