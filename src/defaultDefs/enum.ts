import { ISanivaliDef } from '_src/types';

export type EnumParam = Array<null | boolean | number | string>;

export type EnumRuleItem = ['enum', EnumParam];

export const enumDef: ISanivaliDef = {
  validator: (enums: EnumParam) => {
    if (enums.length <= 5) {
      return (v) => enums.indexOf(v) !== -1;
    }

    const enumMap: { [type: string]: { [key: string]: 1 } } = {};
    for (let i = 0, l = enums.length; i < l; i += 1) {
      const v = enums[i];
      const type = typeof v;
      (enumMap[type] || (enumMap[type] = {}))[String(v)] = 1;
    }

    return (v) => {
      const type = typeof v;
      return type in enumMap && enumMap[type][v] === 1;
    };
  },
  fatal: true,
};
