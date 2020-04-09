export const removeNilItemsDef = {
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
};
//# sourceMappingURL=removeNilItems.js.map