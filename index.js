'use strict';

function quote(str) {
    if (/["\s]/.test(str) && !/'/.test(str)) {
        return "'" + str.replace(/([\\])/g, '\\$1') + "'";
    } else if (/["'\s]/.test(str)) {
        return '"' + str.replace(/(["\\$`!])/g, '\\$1') + '"';
    } else {
        return String(str).replace(
            /([A-z]:)?([#!"$&'()*,:;<=>?@\[\\\]^`{|}])/g,
            '$1\\$2'
        );
    }
}

module.exports = { quote };
