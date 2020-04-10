import { isSanivali } from '../util';
import { Sanivali } from '../sanivali';
export const propertiesDef = {
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
                : new Sanivali(propRules, context.defs);
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
};
//# sourceMappingURL=properties.js.map