'use strict';

/**
 * 
 * @param {string} str 
 * @param {boolean} [allowVars] 
 */
function quote(str, allowVars = false) {
    if (Array.isArray(str)) {
        return str.map(str => quote(str, allowVars)).join(' ');
    } else if (typeof str !== 'string') {
        str = String(str);
    }

    // If we only have double quotes and spaces, and no
    // single quotes, then we can simply surround with
    // single quotes and add a layer of escaping
    // sada\"sd -> 'sada\\"sd'
    if (/["\s]/.test(str) && !/'/.test(str) && !allowVars) {
        return `'${str.replace(/([\\])/g, '\\$1')}'`;
    }

    if (/["'\s]/.test(str)) {
        return doubleQuote(str, allowVars);
    }

    // if we haven't surrounded the word with a double or single quote, then
    // we escape any character with a special meaning. No idea what the ([A-z]:)?
    // is for. But I'm keeping it just in case.
    str = str.replace(/([A-z]:)?([#!"&'()*,:;<=>?@\[\]\\^`{|}])/g, '$1\\$2');

    // if we allow vars, then $ will not be escaped, otherwise, escape.
    if (!allowVars) {
        str = str.replace(/[$]/g, '\\$');
    }

    return str;
}

/**
 * 
 * @param {string} str 
 * @param {boolean} allowVars 
 */
function doubleQuote(str, allowVars = false) {
    const escapedChars = ['"', '\\', '`', '!'];
    if (!allowVars) {
        escapedChars.push('$');
    }

    const regex = RegExp(`([${escapedChars.join('')}])`, 'g');

    return `"${str.replace(regex, '\\$1')}"`;
}

module.exports = { quote, doubleQuote };
