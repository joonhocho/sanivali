export const requiredDef = {
    validator: (keys) => (v) => {
        for (let i = 0, l = keys.length; i < l; i += 1) {
            if (v[keys[i]] === undefined) {
                return false;
            }
        }
        return true;
    },
};
//# sourceMappingURL=required.js.map