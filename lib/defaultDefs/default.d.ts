import { ISanivaliDef } from '../types';
export declare type DefaultValue = null | boolean | number | string;
export declare type DefaultValueThunk = DefaultValue | (() => any);
export declare type DefaultParam = DefaultValueThunk | {
    value: DefaultValueThunk;
    onNull?: boolean;
};
export declare type DefaultRuleItem = ['default', DefaultParam];
export declare const compileDefaultParam: (param: DefaultParam) => (v: unknown) => any;
export declare const defaultDef: ISanivaliDef;
//# sourceMappingURL=default.d.ts.map