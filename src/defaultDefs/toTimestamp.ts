import type { ISanivaliDef } from '_src/types';

export type ToTimestampParam = boolean | undefined;

export type ToTimestampRuleItem =
  | 'toTimestamp'
  | ['toTimestamp', ToTimestampParam?];

export const toTimestampDef: ISanivaliDef = {
  sanitizer: (enable?: ToTimestampParam) =>
    enable === false
      ? null
      : (x: number | string | Date): number | null => {
          const date = new Date(x);
          const t = date.getTime();
          return t === t ? t : null;
        },
};
