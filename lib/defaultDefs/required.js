export const requiredDef = {
    validator: (keys) => (v) => {
        for (let i = 0, l = keys.length; i < l; i += 1) {
            const key = keys[i];
            if (v[key] === undefined) {
                return false;
            }
        }
        return true;
    },
};
//# sourceMappingURL=required.js.map