import { notNilTests } from '../util';
export const removeNilItemsDef = {
    sanitizer: (type = 'nil') => {
        if (type === false)
            return null;
        if (type === true)
            type = 'nil';
        const test = notNilTests[type];
        return (v) => v.filter(test);
    },
};
//# sourceMappingURL=removeNilItems.js.map