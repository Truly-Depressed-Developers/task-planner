String.prototype.toTitleCase = function () {
    if (this.length === 0) { return this.toString(); }
    if (this.length === 1) { return this.toUpperCase() }
    const firstLetter = this[0].toUpperCase();
    const rest = this.substring(1).toLowerCase();
    return firstLetter + rest;
}

export default {};