import { defaultDefs, SanivaliDefaultRuleSchema } from './defaultDefs';
import {
  ISanivaliBuildContext,
  ISanivaliCompiledDef,
  ISanivaliDef,
  ISanivaliDefMap,
  ISanivaliResult,
  ISanivaliRunOptions,
  ValidationResult,
} from './types';
import { isSanivali } from './util';

export class Sanivali<T = any, Schema = SanivaliDefaultRuleSchema> {
  static is = isSanivali;

  public isSanivali = true;
  private rules: Array<ISanivaliCompiledDef | Sanivali> = [];
  public async = false;
  private defs: ISanivaliDefMap = defaultDefs;
  public runOnNil = false;

  constructor(rules?: Schema, defs?: ISanivaliDefMap) {
    if (defs) this.addDefs(defs);
    if (rules) this.addRule(rules);
  }

  addDefs(defs: ISanivaliDefMap): Sanivali<T, Schema> {
    this.defs = { ...this.defs, ...defs };
    return this;
  }

  addDef(type: string, def: ISanivaliDef): Sanivali<T, Schema> {
    this.defs = { ...this.defs, [type]: def };
    return this;
  }

  removeDef(type: string): Sanivali<T, Schema> {
    const { [type]: removed, ...defs } = this.defs;
    this.defs = defs;
    return this;
  }

  addRule(items: Schema): Sanivali<T, Schema> {
    const { defs, rules } = this;
    const ruleItems: Array<[string, any] | Sanivali> = [];

    if (Array.isArray(items)) {
      for (let i = 0, l = items.length; i < l; i += 1) {
        const item = items[i];
        if (isSanivali(item)) {
          ruleItems.push(item);
        } else {
          let type: string;
          let param: any;
          if (typeof item === 'string') {
            type = item;
          } else {
            [type, param] = item;
          }
          ruleItems.push([type, param]);
        }
      }
    } else {
      const types = Object.keys(items) as Array<keyof typeof items & string>;
      for (let i = 0, l = types.length; i < l; i += 1) {
        const type = types[i];
        ruleItems.push([type, items[type]]);
      }
    }

    for (let i = 0, l = ruleItems.length; i < l; i += 1) {
      const rule = ruleItems[i];
      if (isSanivali(rule)) {
        if (rule.async) this.async = true;
        rules.push(rule);
      } else {
        const [type, param] = rule;
        if (!defs.hasOwnProperty(type)) {
          throw new Error(`"${type}" does not exist`);
        }

        const {
          sanitizer,
          validator,
          async = false,
          fatal = false,
          runOnNil = false,
        } = defs[type];

        const compiled: ISanivaliCompiledDef = {
          type,
          sanitize: null,
          validate: null,
          async,
          fatal,
          runOnNil,
        };

        if (param !== undefined) {
          compiled.param = param;
        }

        const context: ISanivaliBuildContext = {
          path: undefined,
          defs,
          rule: compiled,
        };

        if (sanitizer) {
          compiled.sanitize = sanitizer(param, context);
        }

        if (validator) {
          compiled.validate = validator(param, context);
        }

        if (compiled.sanitize || compiled.validate) {
          // this could be changed by complie validator(param, context) call
          if (compiled.async) this.async = true;
          if (compiled.runOnNil) this.runOnNil = true;
          rules.push(compiled);
        }
      }
    }

    return this;
  }

  run(
    val: T,
    opts?: ISanivaliRunOptions
  ): ISanivaliResult | Promise<ISanivaliResult> {
    return this.async ? this.runAsync(val, opts) : this.runSync(val, opts);
  }

  runSync(val: T, opts: ISanivaliRunOptions = {}): ISanivaliResult {
    const { rules } = this;
    const {
      path,
      errors = [],
      maxErrors = 1,
      skipSanitize,
      skipValidate,
    } = opts;
    opts.errors = errors;
    opts.maxErrors = maxErrors;
    const runSanitize = !skipSanitize;
    const runValidate = !skipValidate;
    const hasPath = !!(path && path.length);

    let v = val;
    for (let i = 0, l = rules.length; i < l; i += 1) {
      const rule = rules[i];
      if (!rule.async && (v != null || rule.runOnNil)) {
        if ((rule as Sanivali).isSanivali) {
          const sani = rule as Sanivali;
          const { fatal, value } = sani.runSync(v, opts);
          v = value as T;
          if (fatal || errors.length >= maxErrors) {
            return { fatal, errors, value: v };
          }
        } else {
          const {
            type,
            sanitize,
            validate,
            param,
            fatal,
          } = rule as ISanivaliCompiledDef;
          if (runSanitize && sanitize !== null) {
            v = sanitize(v, opts);
          }
          if (runValidate && validate !== null) {
            const res = validate(v, opts) as ValidationResult;
            if (typeof res === 'boolean') {
              if (!res) {
                errors.push(
                  param === undefined
                    ? hasPath
                      ? { path, type, value: v }
                      : { type, value: v }
                    : hasPath
                    ? { path, type, param, value: v }
                    : { type, param, value: v }
                );
                if (fatal || errors.length >= maxErrors) {
                  return { fatal, errors, value: v };
                }
              }
            } else {
              v = res.value as T;
              if (fatal || res.fatal || errors.length >= maxErrors) {
                return { fatal: fatal || res.fatal, errors, value: v };
              }
            }
          }
        }
      }
    }

    return {
      fatal: false,
      errors: errors.length ? errors : null,
      value: v,
    };
  }

  async runAsync(
    val: T,
    opts: ISanivaliRunOptions = {}
  ): Promise<ISanivaliResult> {
    const { rules } = this;
    const {
      path,
      errors = [],
      maxErrors = 1,
      skipSanitize,
      skipValidate,
    } = opts;
    opts.errors = errors;
    opts.maxErrors = maxErrors;
    const runSanitize = !skipSanitize;
    const runValidate = !skipValidate;
    const hasPath = !!(path && path.length);

    let v = val;
    for (let i = 0, l = rules.length; i < l; i += 1) {
      const rule = rules[i];
      if (v != null || rule.runOnNil) {
        if ((rule as Sanivali).isSanivali) {
          const sani = rule as Sanivali;
          const { fatal, value } = sani.async
            ? await sani.runAsync(v, opts)
            : sani.runSync(v, opts);
          v = value as T;
          if (fatal || errors.length >= maxErrors) {
            return { fatal, errors, value: v };
          }
        } else {
          const {
            type,
            sanitize,
            validate,
            param,
            fatal,
            async,
          } = rule as ISanivaliCompiledDef;
          if (runSanitize && sanitize !== null) {
            v = async ? await sanitize(v, opts) : sanitize(v, opts);
          }
          if (runValidate && validate !== null) {
            const res = async
              ? await validate(v, opts)
              : (validate(v, opts) as ValidationResult);
            if (typeof res === 'boolean') {
              if (!res) {
                errors.push(
                  param === undefined
                    ? hasPath
                      ? { path, type, value: v }
                      : { type, value: v }
                    : hasPath
                    ? { path, type, param, value: v }
                    : { type, param, value: v }
                );
                if (fatal || errors.length >= maxErrors) {
                  return { fatal, errors, value: v };
                }
              }
            } else {
              v = res.value as T;
              if (fatal || res.fatal || errors.length >= maxErrors) {
                return { fatal: fatal || res.fatal, errors, value: v };
              }
            }
          }
        }
      }
    }

    return {
      fatal: false,
      errors: errors.length ? errors : null,
      value: v,
    };
  }
}
