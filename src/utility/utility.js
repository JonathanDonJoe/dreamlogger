// import faker from 'faker';
const faker = require('faker')

function matchWord(s, word) {
    var re = new RegExp('\\b' + word + '\\b', 'g');
    return [...s.matchAll(re)];
}

// replaces last instance of a word
function replaceWord(str, replaceLen, index, word) {
    let newStr = str;
    // console.log(replaceLen)
    // console.log(str.slice(0, index))
    // console.log(str.slice(index))
    // console.log(str.slice(index+replaceLen))
    newStr = str.slice(0, index) + word + str.slice(index + replaceLen)
    return newStr
}

function anonymizeDream(dream) {
    let title = dream.title ? dream.title : 'Untitled'
    let date = dream.date ? '' : 'No date'
    let peopleArr = dream.peopleArr ? dream.peopleArr.filter(person => person).map(person => [person, faker.name.findName()]) : [];
    let people = dream.peopleArr ?  peopleArr.map(personArr => personArr[1]).join(', ') : 'none';
    let contents = 'No Contents'
    

    if (dream.contents) {
        // This does a 1:1 replacement.  It does not replace partial names
        let emphasizedContents = dream.contents;
        for (let i = 0; i < peopleArr.length; i++) {
            let boldName = peopleArr[i][0];
            let replacementName = peopleArr[i][1];
            let matchedArr = matchWord(emphasizedContents, boldName)
            for (let i = matchedArr.length - 1; i >= 0; i--) {
                emphasizedContents = replaceWord(emphasizedContents, boldName.length, matchedArr[i].index, replacementName);
            }
            let boldFirstName = peopleArr[i][0].split(' ')[0]
            let replacementFirstName = peopleArr[i][1].split(' ')[0];
            let matchedArr2 = matchWord(emphasizedContents, boldFirstName)
            for (let i = matchedArr2.length - 1; i >= 0; i--) {
                emphasizedContents = replaceWord(emphasizedContents, boldFirstName.length, matchedArr2[i].index, replacementFirstName);
            }
        }
        contents = emphasizedContents
    }
    return {title, date, contents, people}
}
module.exports = { matchWord, replaceWord, anonymizeDream }