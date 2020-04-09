export const toDateDef = {
    sanitizer: (enable) => enable === false
        ? null
        : (x) => {
            const date = new Date(x);
            const t = date.getTime();
            return t === t ? date : null;
        },
};
//# sourceMappingURL=toDate.js.map