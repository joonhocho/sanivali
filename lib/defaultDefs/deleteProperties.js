import { ANY_KEY, notNilTests } from '../util';
const regexKeyPattern = /^\/.*\/i?$/;
export const deletePropertiesDef = {
    sanitizer: (param) => {
        if (param === false)
            return null;
        if (typeof param === 'string') {
            const shouldNotDelete = notNilTests[param];
            return (v) => {
                const newV = {};
                const keys = Object.keys(v);
                for (let i = 0, l = keys.length; i < l; i += 1) {
                    const key = keys[i];
                    const p = v[key];
                    if (shouldNotDelete(p)) {
                        newV[key] = p;
                    }
                }
                return newV;
            };
        }
        const props = param;
        const pKeys = Object.keys(props);
        const shouldNotDeleteMap = {};
        const keyMap = {};
        let regexes = [];
        for (let i = 0, l = pKeys.length; i < l; i += 1) {
            const key = pKeys[i];
            const pType = props[key];
            const shouldNotDelete = typeof pType === 'boolean'
                ? pType
                    ? () => false
                    : () => true
                : notNilTests[pType];
            shouldNotDeleteMap[key] = shouldNotDelete;
            keyMap[key] = 1;
            if (key === ANY_KEY) {
                regexes.push([ANY_KEY, shouldNotDelete]);
            }
            else if (regexKeyPattern.test(key)) {
                if (key[key.length - 1] === 'i') {
                    regexes.push([
                        new RegExp(key.substring(1, key.length - 2), 'i'),
                        shouldNotDelete,
                    ]);
                }
                else {
                    regexes.push([
                        new RegExp(key.substring(1, key.length - 1)),
                        shouldNotDelete,
                    ]);
                }
            }
        }
        if (!regexes.length)
            regexes = null;
        return (v) => {
            const newV = {};
            const keys = Object.keys(v);
            for (let i = 0, l = keys.length; i < l; i += 1) {
                const key = keys[i];
                const p = v[key];
                let matched = false;
                if (keyMap[key] === 1) {
                    matched = true;
                    if (shouldNotDeleteMap[key](p)) {
                        newV[key] = p;
                    }
                }
                else if (regexes) {
                    for (let j = 0, jl = regexes.length; j < jl; j += 1) {
                        const [regex, shouldNotDelete] = regexes[j];
                        if (regex === ANY_KEY || regex.test(key)) {
                            matched = true;
                            if (shouldNotDelete(p)) {
                                newV[key] = p;
                            }
                            break;
                        }
                    }
                }
                if (!matched) {
                    newV[key] = p;
                }
            }
            return newV;
        };
    },
};
//# sourceMappingURL=deleteProperties.js.map