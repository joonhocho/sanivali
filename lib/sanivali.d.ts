import { SanivaliDefaultRuleSchema } from './defaultDefs';
import { ISanivaliDef, ISanivaliDefMap, ISanivaliResult, ISanivaliRunOptions } from './types';
export declare class Sanivali<T = any, Schema = SanivaliDefaultRuleSchema> {
    static is: (x: unknown) => x is Sanivali<any, SanivaliDefaultRuleSchema<any>>;
    isSanivali: boolean;
    private rules;
    async: boolean;
    private defs;
    runOnNil: boolean;
    constructor(rules?: Schema, defs?: ISanivaliDefMap);
    addDefs(defs: ISanivaliDefMap): Sanivali<T, Schema>;
    addDef(type: string, def: ISanivaliDef): Sanivali<T, Schema>;
    removeDef(type: string): Sanivali<T, Schema>;
    addRule(items: Schema): Sanivali<T, Schema>;
    run(val: T, opts?: ISanivaliRunOptions): ISanivaliResult | Promise<ISanivaliResult>;
    runSync(val: T, opts?: ISanivaliRunOptions): ISanivaliResult;
    runAsync(val: T, opts?: ISanivaliRunOptions): Promise<ISanivaliResult>;
}
//# sourceMappingURL=sanivali.d.ts.map