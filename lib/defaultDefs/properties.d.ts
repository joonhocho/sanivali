import type { SanivaliDefaultRuleSchema } from '../defaultDefsTypes';
import type { ISanivaliDef } from '../types';
import type { Sanivali } from '../sanivali';
export declare type PropertiesParam<T = SanivaliDefaultRuleSchema> = {
    [key: string]: T | Sanivali;
};
export declare type PropertiesRuleItem<T = SanivaliDefaultRuleSchema> = [
    'properties',
    PropertiesParam<T>
];
export declare const propertiesDef: ISanivaliDef;
//# sourceMappingURL=properties.d.ts.map