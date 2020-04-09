import type { Sanivali } from './sanivali';
export declare type PropPath = Array<string | number>;
export declare type Sanitizer<Val = any, Val2 = any> = (v: Val, context: ISanivaliRunOptions) => Val2;
export declare type AsyncSanitizer<Val = any, Val2 = any> = (v: Val, context: ISanivaliRunOptions) => Val2 | Promise<Val2>;
export interface ISanivaliBuildContext {
    path: PropPath | undefined;
    defs: ISanivaliDefMap;
    rule: ISanivaliCompiledDef;
}
export declare type GetSanitizer<Arg = any, Val = any, Val2 = any> = (arg: Arg, context: ISanivaliBuildContext) => Sanitizer<Val, Val2> | AsyncSanitizer<Val, Val2> | null;
export declare type ValidationResult = boolean | ISanivaliResult;
export declare type Validator<Val = unknown> = (v: Val, context: ISanivaliRunOptions) => ValidationResult;
export declare type AsyncValidator<Val = unknown> = (v: Val, context: ISanivaliRunOptions) => ValidationResult | Promise<ValidationResult>;
export declare type GetValidator<Arg = any, Val = unknown> = (arg: Arg, context: ISanivaliBuildContext) => Validator<Val> | AsyncValidator<Val> | null;
export interface ISanivaliDef<Arg = any, Val = any, Val2 = any> {
    sanitizer?: GetSanitizer<Arg, Val, Val2>;
    validator?: GetValidator<Arg, Val>;
    async?: boolean;
    fatal?: boolean;
}
export interface ISanivaliDefMap {
    [type: string]: ISanivaliDef;
}
export interface ISanivaliCompiledDef {
    type: string;
    sanitize: AsyncSanitizer | null;
    validate: AsyncValidator | null;
    param?: any;
    async: boolean;
    fatal: boolean;
}
export declare type SanivaliRule = string | [string] | [string, any] | Sanivali;
export declare type SanivaliRuleMap = {
    [type: string]: any;
};
export declare type SanivaliRuleParsedItem = [string, any];
export declare type SanivaliRuleInput = SanivaliRule[] | SanivaliRuleMap;
export interface ISanivaliRunOptions {
    path?: PropPath;
    maxErrors?: number;
    errors?: ISanivaliError[];
    skipSanitize?: boolean;
    skipValidate?: boolean;
}
export interface ISanivaliError {
    path?: PropPath;
    type: string;
    param?: any;
    value: unknown;
}
export interface ISanivaliResult {
    fatal?: boolean;
    errors: ISanivaliError[] | null;
    value: unknown;
}
//# sourceMappingURL=types.d.ts.map