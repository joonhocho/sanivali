import { notNilTests } from '../util';
const regexKeyPattern = /^\/.*\/i?$/;
export const deleteNilPropertiesDef = {
    sanitizer: (param = 'nil') => {
        if (param === false)
            return null;
        if (param === true)
            param = 'nil';
        let type;
        if (typeof param === 'string') {
            type = param;
            const notNil = notNilTests[type];
            return (v) => {
                const newV = {};
                const keys = Object.keys(v);
                for (let i = 0, l = keys.length; i < l; i += 1) {
                    const key = keys[i];
                    const p = v[key];
                    if (notNil(p)) {
                        newV[key] = p;
                    }
                }
                return newV;
            };
        }
        const props = param;
        const pKeys = Object.keys(props);
        const notNilMap = {};
        const keyMap = {};
        let regexes = [];
        for (let i = 0, l = pKeys.length; i < l; i += 1) {
            const key = pKeys[i];
            const pType = props[key];
            const notNil = typeof pType === 'boolean'
                ? pType
                    ? () => false
                    : () => true
                : notNilTests[pType];
            notNilMap[key] = notNil;
            keyMap[key] = 1;
            if (regexKeyPattern.test(key)) {
                if (key[key.length - 1] === 'i') {
                    regexes.push([
                        new RegExp(key.substring(1, key.length - 2), 'i'),
                        notNil,
                    ]);
                }
                else {
                    regexes.push([new RegExp(key.substring(1, key.length - 1)), notNil]);
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
                    if (notNilMap[key](p)) {
                        newV[key] = p;
                    }
                }
                else if (regexes) {
                    for (let j = 0, jl = regexes.length; j < jl; j += 1) {
                        const [regex, notNil] = regexes[j];
                        if (regex.test(key)) {
                            matched = true;
                            if (notNil(p)) {
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
//# sourceMappingURL=deleteNilProperties.js.map