import type { ISanivaliDef } from '_src/types';
import type { ISanivaliDefaultRuleMap } from './defaultDefsTypes';
import type { ISanivaliDefMap } from './types';

export const defaultDefs: ISanivaliDefMap = {};

export const addDef = <Key extends string = keyof ISanivaliDefaultRuleMap>(
  name: Key,
  def: ISanivaliDef
) => {
  if (name in defaultDefs) {
    throw new Error(`${name} definition already exists`);
  }
  defaultDefs[name] = def;
};
