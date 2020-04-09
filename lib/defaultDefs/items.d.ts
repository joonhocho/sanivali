import { ISanivaliDef } from '../types';
import { SanivaliDefaultRuleSchema } from '../defaultDefs';
import { Sanivali } from '../sanivali';
export declare type ItemsParam<T = SanivaliDefaultRuleSchema> = T | Sanivali;
export declare type ItemsRuleItem<T = SanivaliDefaultRuleSchema> = ['items', ItemsParam<T>];
export declare const itemsDef: ISanivaliDef;
//# sourceMappingURL=items.d.ts.map