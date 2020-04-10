import type { Sanivali } from './sanivali';
import { NilType } from './types';
export declare const isSanivali: (x: unknown) => x is Sanivali<any, import("./defaultDefs").SanivaliDefaultRuleSchema<any>>;
export declare const isEmptyObject: (x: unknown) => boolean;
export declare const isInteger: (number: number) => boolean;
export declare const isEmpty: (v: unknown) => boolean;
export declare const nilTests: Record<NilType, (x: any) => boolean>;
export declare const notNilTests: Record<NilType, (x: any) => boolean>;
//# sourceMappingURL=util.d.ts.map