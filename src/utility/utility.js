function matchWord(s, word) {
    var re = new RegExp( '\\b' + word + '\\b', 'g');
    return [...s.matchAll(re)];
}

// replaces last instance of a word
function replaceWord(str, replaceLen, index, word) {
    let newStr = str;
    // console.log(replaceLen)
    // console.log(str.slice(0, index))
    // console.log(str.slice(index))
    // console.log(str.slice(index+replaceLen))
    newStr = str.slice(0,index) + word + str.slice(index+replaceLen)
    return newStr
}

module.exports = {matchWord, replaceWord}