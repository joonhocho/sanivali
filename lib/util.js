export const isSanivali = (x) => x ? x.isSanivali === true : false;
export const isEmptyObject = (x) => {
    if (typeof x === 'object') {
        for (const k in x) {
            if (x.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
    return false;
};
//# sourceMappingURL=util.js.map