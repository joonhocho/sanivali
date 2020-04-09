import { ISanivaliDef } from '_src/types';

export type ParseIntParam = boolean | number | undefined;

export type ParseIntRuleItem = 'parseInt' | ['parseInt', ParseIntParam?];

export const parseIntDef: ISanivaliDef = {
  sanitizer: (opts?: ParseIntParam) => {
    if (opts === false) return null;

    const radix = typeof opts === 'number' ? opts : 10;

    return (v: string) => {
      try {
        const n = parseInt(v, radix);
        return n === n ? n : null;
      } catch (e) {
        return null;
      }
    };
  },
};
