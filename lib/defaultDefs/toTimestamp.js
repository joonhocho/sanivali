export const toTimestampDef = {
    sanitizer: (enable) => enable === false
        ? null
        : (x) => {
            const date = new Date(x);
            const t = date.getTime();
            return t === t ? t : null;
        },
};
//# sourceMappingURL=toTimestamp.js.map