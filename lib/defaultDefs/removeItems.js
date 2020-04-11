import { notNilTests } from '../util';
export const removeItemsDef = {
    sanitizer: (type = 'nil') => {
        if (type === false)
            return null;
        const test = notNilTests[type];
        return (v) => v.filter(test);
    },
};
//# sourceMappingURL=removeItems.js.map