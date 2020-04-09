import { ISanivaliDef } from '_src/types';

export type ToDateParam = boolean | undefined;

export type ToDateRuleItem = 'toDate' | ['toDate', ToDateParam?];

export const toDateDef: ISanivaliDef = {
  sanitizer: (enable?: ToDateParam) =>
    enable === false
      ? null
      : (x: number | string | Date): Date | null => {
          const date = new Date(x);
          const t = date.getTime();
          return t === t ? date : null;
        },
};
