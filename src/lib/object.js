function isEmpty(obj) {
    if (obj == undefined || obj == null) return false;
    return !Object.keys(obj).length;
}

module.exports = {
    isEmpty
};