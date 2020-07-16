import { ISanivaliDef } from '_src/types';

export type SanitizeParam = (x: unknown) => unknown;

export type SanitizeRuleItem = ['sanitize', SanitizeParam];

export const sanitizeDef: ISanivaliDef = {
  sanitizer: (fn: SanitizeParam) => fn,
};
