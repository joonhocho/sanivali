import { ISanivaliDef, ISanivaliDefMap, ISanivaliResult, ISanivaliRunOptions, PropPath, SanivaliRuleInput } from './types';
export declare class Sanivali<T = any> {
    path?: PropPath | undefined;
    static is: (x: unknown) => x is Sanivali<any>;
    isSanivali: boolean;
    private rules;
    async: boolean;
    private defs;
    constructor(rules?: SanivaliRuleInput, defs?: ISanivaliDefMap, path?: PropPath | undefined);
    addDefs(defs: ISanivaliDefMap): Sanivali<T>;
    addDef(type: string, def: ISanivaliDef): Sanivali<T>;
    removeDef(type: string): Sanivali<T>;
    addRule(items: SanivaliRuleInput): Sanivali<T>;
    run(val: T, opts?: ISanivaliRunOptions): ISanivaliResult | Promise<ISanivaliResult>;
    runSync(val: T, opts?: ISanivaliRunOptions): ISanivaliResult;
    runAsync(val: T, opts?: ISanivaliRunOptions): Promise<ISanivaliResult>;
}
//# sourceMappingURL=sanivali.d.ts.map