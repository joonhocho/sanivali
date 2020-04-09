import { ISanivaliDef } from '../types';
import { Sanivali } from '../sanivali';
import { SanivaliDefaultRuleSchema } from '../defaultDefs';
export declare type PropertiesParam<T = SanivaliDefaultRuleSchema> = {
    [key: string]: T | Sanivali;
};
export declare type PropertiesRuleItem<T = SanivaliDefaultRuleSchema> = ['properties', PropertiesParam<T>];
export declare const propertiesDef: ISanivaliDef;
//# sourceMappingURL=properties.d.ts.map