function matchWord(s, word) {
    var re = new RegExp( '\\b' + word + '\\b', 'g');
    return [...s.matchAll(re)];
}

// replaces last instance of a word
function replaceWord(str, replaceLen, index, word) {
    let newStr = str;
    newStr = str.slice(0,index) + word + str.slice(index+replaceLen-1)
    return newStr
}

module.exports = {matchWord, replaceWord}