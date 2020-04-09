import { SanivaliDefaultRuleSchema } from './defaultDefs';
import { ISanivaliDef, ISanivaliDefMap, ISanivaliResult, ISanivaliRunOptions, PropPath } from './types';
export declare class Sanivali<T = any, Schema = SanivaliDefaultRuleSchema> {
    path?: PropPath | undefined;
    static is: (x: unknown) => x is Sanivali<any, SanivaliDefaultRuleSchema<any>>;
    isSanivali: boolean;
    private rules;
    async: boolean;
    private defs;
    constructor(rules?: Schema, defs?: ISanivaliDefMap, path?: PropPath | undefined);
    addDefs(defs: ISanivaliDefMap): Sanivali<T>;
    addDef(type: string, def: ISanivaliDef): Sanivali<T>;
    removeDef(type: string): Sanivali<T>;
    addRule(items: Schema): Sanivali<T>;
    run(val: T, opts?: ISanivaliRunOptions): ISanivaliResult | Promise<ISanivaliResult>;
    runSync(val: T, opts?: ISanivaliRunOptions): ISanivaliResult;
    runAsync(val: T, opts?: ISanivaliRunOptions): Promise<ISanivaliResult>;
}
//# sourceMappingURL=sanivali.d.ts.map