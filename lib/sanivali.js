import { __rest } from "tslib";
import { defaultDefs } from './defaultDefs';
import { isSanivali } from './util';
export class Sanivali {
    constructor(rules, defs) {
        this.isSanivali = true;
        this.rules = [];
        this.async = false;
        this.defs = defaultDefs;
        this.runOnNil = false;
        if (defs)
            this.addDefs(defs);
        if (rules)
            this.addRule(rules);
    }
    addDefs(defs) {
        this.defs = Object.assign(Object.assign({}, this.defs), defs);
        return this;
    }
    addDef(type, def) {
        this.defs = Object.assign(Object.assign({}, this.defs), { [type]: def });
        return this;
    }
    removeDef(type) {
        const _a = this.defs, _b = type, removed = _a[_b], defs = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        this.defs = defs;
        return this;
    }
    addRule(items) {
        const { defs, rules } = this;
        const ruleItems = [];
        if (Array.isArray(items)) {
            for (let i = 0, l = items.length; i < l; i += 1) {
                const item = items[i];
                if (isSanivali(item)) {
                    ruleItems.push(item);
                }
                else {
                    let type;
                    let param;
                    if (typeof item === 'string') {
                        type = item;
                    }
                    else {
                        [type, param] = item;
                    }
                    ruleItems.push([type, param]);
                }
            }
        }
        else {
            const types = Object.keys(items);
            for (let i = 0, l = types.length; i < l; i += 1) {
                const type = types[i];
                ruleItems.push([type, items[type]]);
            }
        }
        for (let i = 0, l = ruleItems.length; i < l; i += 1) {
            const rule = ruleItems[i];
            if (isSanivali(rule)) {
                if (rule.async)
                    this.async = true;
                rules.push(rule);
            }
            else {
                const [type, param] = rule;
                if (!defs.hasOwnProperty(type)) {
                    throw new Error(`"${type}" does not exist`);
                }
                const { sanitizer, validator, async = false, fatal = false, runOnNil = false, } = defs[type];
                const compiled = {
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
                const context = {
                    path: undefined,
                    defs,
                    rule: compiled,
                    createSanivali: (schema, defsArg = defs) => new Sanivali(schema, defsArg),
                };
                if (sanitizer) {
                    compiled.sanitize = sanitizer(param, context);
                }
                if (validator) {
                    compiled.validate = validator(param, context);
                }
                if (compiled.sanitize || compiled.validate) {
                    if (compiled.async)
                        this.async = true;
                    if (compiled.runOnNil)
                        this.runOnNil = true;
                    rules.push(compiled);
                }
            }
        }
        return this;
    }
    run(val, opts) {
        return this.async ? this.runAsync(val, opts) : this.runSync(val, opts);
    }
    runSync(val, opts = {}) {
        const { rules } = this;
        const { path, errors = [], maxErrors = 1, skipSanitize, skipValidate, } = opts;
        opts.errors = errors;
        opts.maxErrors = maxErrors;
        const runSanitize = !skipSanitize;
        const runValidate = !skipValidate;
        const hasPath = !!(path && path.length);
        let v = val;
        for (let i = 0, l = rules.length; i < l; i += 1) {
            const rule = rules[i];
            if (!rule.async && (v != null || rule.runOnNil)) {
                if (rule.isSanivali) {
                    const sani = rule;
                    const { fatal, value } = sani.runSync(v, opts);
                    v = value;
                    if (fatal || errors.length >= maxErrors) {
                        return { fatal, errors, value: v };
                    }
                }
                else {
                    const { type, sanitize, validate, param, fatal, } = rule;
                    if (runSanitize && sanitize !== null) {
                        v = sanitize(v, opts);
                    }
                    if (runValidate && validate !== null) {
                        const res = validate(v, opts);
                        if (typeof res === 'boolean') {
                            if (!res) {
                                errors.push(param === undefined
                                    ? hasPath
                                        ? { path, type, value: v }
                                        : { type, value: v }
                                    : hasPath
                                        ? { path, type, param, value: v }
                                        : { type, param, value: v });
                                if (fatal || errors.length >= maxErrors) {
                                    return { fatal, errors, value: v };
                                }
                            }
                        }
                        else {
                            v = res.value;
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
    async runAsync(val, opts = {}) {
        const { rules } = this;
        const { path, errors = [], maxErrors = 1, skipSanitize, skipValidate, } = opts;
        opts.errors = errors;
        opts.maxErrors = maxErrors;
        const runSanitize = !skipSanitize;
        const runValidate = !skipValidate;
        const hasPath = !!(path && path.length);
        let v = val;
        for (let i = 0, l = rules.length; i < l; i += 1) {
            const rule = rules[i];
            if (v != null || rule.runOnNil) {
                if (rule.isSanivali) {
                    const sani = rule;
                    const { fatal, value } = sani.async
                        ? await sani.runAsync(v, opts)
                        : sani.runSync(v, opts);
                    v = value;
                    if (fatal || errors.length >= maxErrors) {
                        return { fatal, errors, value: v };
                    }
                }
                else {
                    const { type, sanitize, validate, param, fatal, async, } = rule;
                    if (runSanitize && sanitize !== null) {
                        v = async ? await sanitize(v, opts) : sanitize(v, opts);
                    }
                    if (runValidate && validate !== null) {
                        const res = async
                            ? await validate(v, opts)
                            : validate(v, opts);
                        if (typeof res === 'boolean') {
                            if (!res) {
                                errors.push(param === undefined
                                    ? hasPath
                                        ? { path, type, value: v }
                                        : { type, value: v }
                                    : hasPath
                                        ? { path, type, param, value: v }
                                        : { type, param, value: v });
                                if (fatal || errors.length >= maxErrors) {
                                    return { fatal, errors, value: v };
                                }
                            }
                        }
                        else {
                            v = res.value;
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
Sanivali.is = isSanivali;
//# sourceMappingURL=sanivali.js.map