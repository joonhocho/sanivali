import { ISanivaliDef } from '../types';
import { Sanivali } from '../sanivali';
import { SanivaliDefaultRuleSchema } from '../defaultDefs';
export declare type IfElseParam<T = SanivaliDefaultRuleSchema> = {
    if: T | Sanivali;
    then?: T | Sanivali;
    else?: T | Sanivali;
} | [T | Sanivali, T | Sanivali | null, (T | Sanivali | null | undefined)?];
export declare type IfElseRuleItem<T = SanivaliDefaultRuleSchema> = ['ifElse', IfElseParam<T>];
export declare const ifElseDef: ISanivaliDef;
//# sourceMappingURL=ifElse.d.ts.map