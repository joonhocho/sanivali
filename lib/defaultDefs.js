import { Sanivali } from './sanivali';
import { isEmpty, isInteger, isSanivali } from './util';
const leftWS = /^\s+/;
const rightWS = /\s+$/;
const { floor } = Math;
export const defaultDefs = {
    default: {
        sanitizer: (opts) => {
            let value = opts;
            let onNull = false;
            if (opts && typeof opts === 'object') {
                value = opts.value;
                onNull = opts.onNull;
            }
            if (typeof value === 'function') {
                if (onNull) {
                    return (v) => (v == null ? value() : v);
                }
                return (v) => (v === undefined ? value() : v);
            }
            if (onNull) {
                return (v) => (v == null ? value : v);
            }
            return (v) => (v === undefined ? value : v);
        },
    },
    emptyToNull: {
        sanitizer: (enable) => {
            if (enable === false)
                return null;
            return (v) => (isEmpty(v) ? null : v);
        },
    },
    valid: {
        validator: () => () => true,
    },
    invalid: {
        validator: () => () => false,
    },
    type: {
        validator: (type) => {
            if (type === 'undefined') {
                return (v) => v === undefined;
            }
            if (type === 'null') {
                return (v) => v === null;
            }
            if (type === 'nil') {
                return (v) => v == null;
            }
            if (type === 'object') {
                return (v) => v != null && typeof v === 'object' && !Array.isArray(v);
            }
            if (type === 'array') {
                return Array.isArray;
            }
            if (type === 'integer') {
                return (v) => typeof v === 'number' && isInteger(v);
            }
            return (v) => typeof v === type;
        },
        fatal: true,
    },
    instance: {
        validator: (Class) => (v) => v instanceof Class,
        fatal: true,
    },
    enum: {
        validator: (enums) => {
            if (enums.length <= 5) {
                return (v) => enums.indexOf(v) !== -1;
            }
            const enumMap = {};
            for (let i = 0, l = enums.length; i < l; i += 1) {
                const v = enums[i];
                const type = typeof v;
                (enumMap[type] || (enumMap[type] = {}))[v] = 1;
            }
            return (v) => {
                const type = typeof v;
                return type in enumMap && enumMap[type][v] === 1;
            };
        },
        fatal: true,
    },
    parseInt: {
        sanitizer: (opts) => {
            if (opts === false)
                return null;
            const radix = typeof opts === 'number' ? opts : 10;
            return (v) => {
                try {
                    const n = parseInt(v, radix);
                    return n === n ? n : null;
                }
                catch (e) {
                    return null;
                }
            };
        },
    },
    parseFloat: {
        sanitizer: (enable) => {
            if (enable === false)
                return null;
            return (v) => {
                try {
                    const n = parseFloat(v);
                    return n === n ? n : null;
                }
                catch (e) {
                    return null;
                }
            };
        },
    },
    finite: {
        validator: (enable) => (enable === false ? null : isFinite),
        fatal: true,
    },
    integer: {
        validator: (enable) => (enable === false ? null : isInteger),
        fatal: true,
    },
    safeInteger: {
        validator: (enable) => {
            if (enable === false)
                return null;
            if (Number.isSafeInteger) {
                return Number.isSafeInteger;
            }
            const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
            const { abs } = Math;
            return (v) => isFinite(v) && floor(v) === v && abs(v) <= MAX_SAFE_INTEGER;
        },
        fatal: true,
    },
    minimum: {
        validator: (min) => (v) => v >= min,
    },
    exclusiveMinimum: {
        validator: (min) => (v) => v > min,
    },
    maximum: {
        validator: (max) => (v) => v <= max,
    },
    exclusiveMaximum: {
        validator: (max) => (v) => v < max,
    },
    trim: {
        sanitizer: (enable) => {
            if (enable === false)
                return null;
            if (typeof ''.trim === 'function') {
                return (v) => v.trim();
            }
            return (v) => v.replace(leftWS, '').replace(rightWS, '');
        },
    },
    trimLeft: {
        sanitizer: (enable) => {
            if (enable === false)
                return null;
            if (typeof ''.trimLeft === 'function') {
                return (v) => v.trimLeft();
            }
            return (v) => v.replace(leftWS, '');
        },
    },
    trimRight: {
        sanitizer: (enable) => {
            if (enable === false)
                return null;
            if (typeof ''.trimRight === 'function') {
                return (v) => v.trimRight();
            }
            return (v) => v.replace(rightWS, '');
        },
    },
    trimToNull: {
        sanitizer: (enable) => {
            if (enable === false)
                return null;
            if (typeof ''.trim === 'function') {
                return (v) => (v && v.trim()) || null;
            }
            return (v) => (v && v.replace(leftWS, '').replace(rightWS, '')) || null;
        },
    },
    toLocaleLowerCase: {
        sanitizer: (locales) => (x) => x.toLocaleLowerCase(locales),
    },
    toLocaleUpperCase: {
        sanitizer: (locales) => (x) => x.toLocaleUpperCase(locales),
    },
    toLowerCase: {
        sanitizer: (enable) => enable === false ? null : (x) => x.toLowerCase(),
    },
    toUpperCase: {
        sanitizer: (enable) => enable === false ? null : (x) => x.toUpperCase(),
    },
    minLength: {
        validator: (min) => (v) => v.length >= min,
    },
    maxLength: {
        validator: (max) => (v) => v.length <= max,
    },
    pattern: {
        validator: (pattern) => {
            const reg = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
            return (v) => reg.test(v);
        },
    },
    toDate: {
        sanitizer: (enable) => enable === false
            ? null
            : (x) => {
                const date = new Date(x);
                const t = date.getTime();
                return t === t ? date : null;
            },
    },
    toTimestamp: {
        sanitizer: (enable) => enable === false
            ? null
            : (x) => {
                const date = new Date(x);
                const t = date.getTime();
                return t === t ? t : null;
            },
    },
    filterItems: {
        sanitizer: (fn) => (v) => v.filter(fn),
    },
    removeDuplicateItems: {
        sanitizer: (getKey) => {
            if (typeof getKey === 'string') {
                return (v) => {
                    const keyMap = {};
                    const filtered = [];
                    for (let i = 0, l = v.length; i < l; i += 1) {
                        const x = v[i];
                        const key = x[getKey];
                        if (keyMap[key] !== 1) {
                            keyMap[key] = 1;
                            filtered.push(x);
                        }
                    }
                    return filtered;
                };
            }
            if (getKey) {
                return (v) => {
                    const keyMap = {};
                    const filtered = [];
                    for (let i = 0, l = v.length; i < l; i += 1) {
                        const x = v[i];
                        const key = getKey(x);
                        if (keyMap[key] !== 1) {
                            keyMap[key] = 1;
                            filtered.push(x);
                        }
                    }
                    return filtered;
                };
            }
            return (v) => {
                const keyMap = {};
                const filtered = [];
                for (let i = 0, l = v.length; i < l; i += 1) {
                    const x = v[i];
                    if (keyMap[x] !== 1) {
                        keyMap[x] = 1;
                        filtered.push(x);
                    }
                }
                return filtered;
            };
        },
    },
    removeNilItems: {
        sanitizer: (type) => {
            let fn;
            if (type === 'undefined') {
                fn = (x) => x !== undefined;
            }
            else if (type === 'null' || type === null) {
                fn = (x) => x !== null;
            }
            else {
                fn = (x) => x != null;
            }
            return (v) => v.filter(fn);
        },
    },
    minItems: {
        validator: (min) => (v) => v.length >= min,
    },
    maxItems: {
        validator: (max) => (v) => v.length <= max,
    },
    uniqueItems: {
        validator: (getKey) => {
            if (typeof getKey === 'string') {
                return (v) => {
                    const keyMap = {};
                    for (let i = 0, l = v.length; i < l; i += 1) {
                        const key = v[i][getKey];
                        if (keyMap[key] === 1) {
                            return false;
                        }
                        keyMap[key] = 1;
                    }
                    return true;
                };
            }
            if (getKey) {
                return (v) => {
                    const keyMap = {};
                    for (let i = 0, l = v.length; i < l; i += 1) {
                        const key = getKey(v[i]);
                        if (keyMap[key] === 1) {
                            return false;
                        }
                        keyMap[key] = 1;
                    }
                    return true;
                };
            }
            return (v) => {
                const keyMap = {};
                for (let i = 0, l = v.length; i < l; i += 1) {
                    const key = v[i];
                    if (keyMap[key] === 1) {
                        return false;
                    }
                    keyMap[key] = 1;
                }
                return true;
            };
        },
    },
    items: {
        validator: (rulesOrSani, context) => {
            const sani = isSanivali(rulesOrSani)
                ? rulesOrSani
                : new Sanivali(rulesOrSani, context.defs, context.path);
            if (sani.async) {
                context.rule.async = true;
                return async (v, opts) => {
                    const errors = opts.errors;
                    const path = opts.path || [];
                    const res = await Promise.all(v.map((x, i) => sani.run(x, Object.assign(Object.assign({}, opts), { path: [...path, i] }))));
                    const value = res.map((x) => x.value);
                    return { fatal: false, errors: errors.length ? errors : null, value };
                };
            }
            return (v, opts) => {
                const value = v.slice();
                const errors = opts.errors;
                const maxErrors = opts.maxErrors;
                const path = opts.path || [];
                for (let i = 0, l = v.length; i < l; i += 1) {
                    value[i] = sani.runSync(v[i], Object.assign(Object.assign({}, opts), { path: [...path, i] })).value;
                    if (errors.length >= maxErrors) {
                        return { fatal: false, errors, value };
                    }
                }
                return { fatal: false, errors: errors.length ? errors : null, value };
            };
        },
    },
    filterProperties: {
        sanitizer: (fn) => {
            return (v) => {
                const newV = Object.assign({}, v);
                const ks = Object.keys(newV);
                for (let i = 0, l = ks.length; i < l; i += 1) {
                    const key = ks[i];
                    if (!fn(newV[key], key)) {
                        delete newV[key];
                    }
                }
                return newV;
            };
        },
    },
    deleteNilProperties: {
        sanitizer: ({ type, keys, excludeKeys, } = {}) => {
            let fn;
            if (type === 'undefined') {
                fn = (x) => x === undefined;
            }
            else if (type === 'null' || type === null) {
                fn = (x) => x === null;
            }
            else if (type === 'empty') {
                fn = isEmpty;
            }
            else {
                fn = (x) => x == null;
            }
            const excludeMap = {};
            if (excludeKeys) {
                for (let i = 0, l = excludeKeys.length; i < l; i += 1) {
                    excludeMap[excludeKeys[i]] = 1;
                }
            }
            return (v) => {
                const newV = Object.assign({}, v);
                const ks = keys || Object.keys(newV);
                for (let i = 0, l = ks.length; i < l; i += 1) {
                    const key = ks[i];
                    if (excludeMap[key] !== 1 && fn(newV[key])) {
                        delete newV[key];
                    }
                }
                return newV;
            };
        },
    },
    required: {
        validator: (keys) => (v) => {
            for (let i = 0, l = keys.length; i < l; i += 1) {
                const key = keys[i];
                if (v[key] === undefined) {
                    return false;
                }
            }
            return true;
        },
    },
    minProperties: {
        validator: (min) => (v) => Object.keys(v).length >= min,
    },
    maxProperties: {
        validator: (max) => (v) => Object.keys(v).length <= max,
    },
    dependencies: {
        validator: (depsMap) => {
            const keys = Object.keys(depsMap);
            return (v) => {
                for (let i = 0, l = keys.length; i < l; i += 1) {
                    const key = keys[i];
                    if (v[key] !== undefined) {
                        const deps = depsMap[key];
                        for (let j = 0, jl = deps.length; j < jl; j += 1) {
                            if (v[deps[j]] === undefined) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            };
        },
    },
    properties: {
        validator: (props, context) => {
            const keys = Object.keys(props);
            const stringKeyMap = {};
            const stringKeys = [];
            const patternKeys = [];
            const regexKeyPattern = /^\/.*\/i?$/;
            let async = false;
            for (let i = 0, l = keys.length; i < l; i += 1) {
                const key = keys[i];
                const propRules = props[key];
                const sani = isSanivali(propRules)
                    ? propRules
                    : new Sanivali(propRules, context.defs, context.path);
                async = async || sani.async;
                if (key.length > 2 && regexKeyPattern.test(key)) {
                    if (key[key.length - 1] === 'i') {
                        patternKeys.push([
                            new RegExp(key.substring(1, key.length - 2), 'i'),
                            sani,
                        ]);
                    }
                    else {
                        patternKeys.push([
                            new RegExp(key.substring(1, key.length - 1)),
                            sani,
                        ]);
                    }
                }
                else {
                    stringKeyMap[key] = 1;
                    stringKeys.push([key, sani]);
                }
            }
            if (async) {
                context.rule.async = true;
                return async (raw, opts) => {
                    const errors = opts.errors;
                    const path = opts.path || [];
                    const promises = stringKeys.map(([key, sani]) => key in raw
                        ? sani.run(raw[key], Object.assign(Object.assign({}, opts), { path: [...path, key] }))
                        : null);
                    const vKeys = Object.keys(raw);
                    const matchedKeys = [];
                    for (let i = 0, l = vKeys.length; i < l; i += 1) {
                        const key = vKeys[i];
                        if (stringKeyMap[key] !== 1) {
                            for (let j = 0, jl = patternKeys.length; j < jl; j += 1) {
                                const [regex, sani] = patternKeys[j];
                                if (regex.test(key)) {
                                    matchedKeys.push(key);
                                    promises.push(sani.run(raw[key], Object.assign(Object.assign({}, opts), { path: [...path, key] })));
                                    break;
                                }
                            }
                        }
                    }
                    const results = await Promise.all(promises);
                    const value = Object.assign({}, raw);
                    for (let i = 0, l = stringKeys.length; i < l; i += 1) {
                        const result = results[i];
                        if (result) {
                            const newPropValue = result.value;
                            const key = stringKeys[i][0];
                            if (newPropValue === undefined) {
                                delete value[key];
                            }
                            else {
                                value[key] = newPropValue;
                            }
                        }
                    }
                    for (let i = 0, l = matchedKeys.length, sl = stringKeys.length; i < l; i += 1) {
                        const newPropValue = results[sl + i].value;
                        const key = matchedKeys[i];
                        if (newPropValue === undefined) {
                            delete value[key];
                        }
                        else {
                            value[key] = newPropValue;
                        }
                    }
                    return { fatal: false, errors: errors.length ? errors : null, value };
                };
            }
            return (raw, opts) => {
                const errors = opts.errors;
                const maxErrors = opts.maxErrors;
                const path = opts.path || [];
                const value = Object.assign({}, raw);
                for (let i = 0, l = stringKeys.length; i < l; i += 1) {
                    const [key, sani] = stringKeys[i];
                    if (key in value) {
                        const res = sani.runSync(value[key], Object.assign(Object.assign({}, opts), { path: [...path, key] }));
                        const newPropValue = res.value;
                        if (newPropValue === undefined) {
                            delete value[key];
                        }
                        else {
                            value[key] = newPropValue;
                        }
                        if (errors.length >= maxErrors) {
                            return { fatal: false, errors, value };
                        }
                    }
                }
                const vKeys = Object.keys(value);
                for (let i = 0, l = vKeys.length; i < l; i += 1) {
                    const key = vKeys[i];
                    if (stringKeyMap[key] !== 1) {
                        for (let j = 0, jl = patternKeys.length; j < jl; j += 1) {
                            const [regex, sani] = patternKeys[j];
                            if (regex.test(key)) {
                                const res = sani.runSync(value[key], Object.assign(Object.assign({}, opts), { path: [...path, key] }));
                                const newPropValue = res.value;
                                if (newPropValue === undefined) {
                                    delete value[key];
                                }
                                else {
                                    value[key] = newPropValue;
                                }
                                if (errors.length >= maxErrors) {
                                    return { fatal: false, errors, value };
                                }
                                break;
                            }
                        }
                    }
                }
                return { fatal: false, errors: errors.length ? errors : null, value };
            };
        },
    },
    anyOf: {
        validator: (conditions, context) => {
            let async = false;
            const sanis = conditions.map((x) => {
                const sani = isSanivali(x)
                    ? x
                    : new Sanivali(x, context.defs, context.path);
                async = async || sani.async;
                return sani;
            });
            if (async) {
                context.rule.async = true;
                return async (v, opts) => {
                    const errors = opts.errors;
                    const maxErrors = opts.maxErrors - errors.length;
                    const results = await Promise.all(sanis.map((x) => x.run(v, Object.assign(Object.assign({}, opts), { errors: [], maxErrors }))));
                    const allErrors = [];
                    for (let i = 0, l = results.length; i < l; i += 1) {
                        const res = results[i];
                        if (!res.errors) {
                            return Object.assign(Object.assign({}, res), { errors: errors.length ? errors : null });
                        }
                        allErrors.push(...res.errors);
                    }
                    errors.push(...allErrors);
                    return {
                        fatal: false,
                        errors: errors.length ? errors : null,
                        value: v,
                    };
                };
            }
            return (v, opts) => {
                const errors = opts.errors;
                const maxErrors = opts.maxErrors - errors.length;
                const allErrors = [];
                for (let i = 0, l = sanis.length; i < l; i += 1) {
                    const res = sanis[i].runSync(v, Object.assign(Object.assign({}, opts), { errors: [], maxErrors }));
                    if (!res.errors) {
                        return Object.assign(Object.assign({}, res), { errors: errors.length ? errors : null });
                    }
                    allErrors.push(...res.errors);
                }
                errors.push(...allErrors);
                return {
                    fatal: false,
                    errors: errors.length ? errors : null,
                    value: v,
                };
            };
        },
    },
    ifElse: {
        validator: ({ if: ifRule, then: thenRule, else: elseRule, }, context) => {
            const ifSani = isSanivali(ifRule)
                ? ifRule
                : new Sanivali(ifRule, context.defs, context.path);
            const thenSani = thenRule == null
                ? null
                : isSanivali(thenRule)
                    ? thenRule
                    : new Sanivali(thenRule, context.defs, context.path);
            const elseSani = elseRule == null
                ? null
                : isSanivali(elseRule)
                    ? elseRule
                    : new Sanivali(elseRule, context.defs, context.path);
            if (ifSani.async ||
                (thenSani && thenSani.async) ||
                (elseSani && elseSani.async)) {
                context.rule.async = true;
                return async (v, opts) => {
                    if ((await ifSani.run(v, Object.assign(Object.assign({}, opts), { maxErrors: 1, errors: [] }))).errors) {
                        return elseSani ? elseSani.run(v, opts) : true;
                    }
                    return thenSani ? thenSani.run(v, opts) : true;
                };
            }
            return (v, opts) => {
                if (ifSani.runSync(v, Object.assign(Object.assign({}, opts), { maxErrors: 1, errors: [] })).errors) {
                    return elseSani ? elseSani.runSync(v, opts) : true;
                }
                return thenSani ? thenSani.runSync(v, opts) : true;
            };
        },
    },
};
//# sourceMappingURL=defaultDefs.js.map