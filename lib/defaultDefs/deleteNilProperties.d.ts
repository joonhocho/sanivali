import { ISanivaliDef } from '../types';
export declare type DeleteNilPropertiesParam = {
    type?: 'undefined' | 'null' | null | 'nil' | 'empty';
    keys?: string[];
    excludeKeys?: string[];
};
export declare type DeleteNilPropertiesRuleItem = 'deleteNilProperties' | ['deleteNilProperties', DeleteNilPropertiesParam?];
export declare const deleteNilPropertiesDef: ISanivaliDef;
//# sourceMappingURL=deleteNilProperties.d.ts.map