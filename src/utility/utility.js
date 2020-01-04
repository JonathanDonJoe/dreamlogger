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

function filterDream(dream) {
    let dreamTitle = 'Untitled'
    let dreamDate = 'No date'
    let dreamContents = 'No Contents'
    let dreamPeople = 'none';
    let dreamPeopleArr = [];

    if (dream.date) {
        dreamDate = ''
    }

    if (dream.title) {
        dreamTitle = dream.title;
    }
    if (dream.peopleArr) {
        dreamPeopleArr = dream.peopleArr.filter(person => person).map(person => [person, faker.name.findName()])
        dreamPeople = dreamPeopleArr.map(personArr => personArr[1]).join(', ');
    }
    if (dream.contents) {
        // This does a 1:1 replacement.  It does not replace partial names
        let emphasizedContents = dream.contents;
        for (let i = 0; i < dreamPeopleArr.length; i++) {
            let boldName = dreamPeopleArr[i][0];
            let replacementName = dreamPeopleArr[i][1];
            let matchedArr = matchWord(emphasizedContents, boldName)
            for (let i = matchedArr.length - 1; i >= 0; i--) {
                emphasizedContents = replaceWord(emphasizedContents, boldName.length, matchedArr[i].index, replacementName);
            }
            let boldFirstName = dreamPeopleArr[i][0].split(' ')[0]
            let replacementFirstName = dreamPeopleArr[i][1].split(' ')[0];
            let matchedArr2 = matchWord(emphasizedContents, boldFirstName)
            for (let i = matchedArr2.length - 1; i >= 0; i--) {
                emphasizedContents = replaceWord(emphasizedContents, boldFirstName.length, matchedArr2[i].index, replacementFirstName);
            }
        }
        dreamContents = emphasizedContents
    }
    return {dreamTitle, dreamDate, dreamContents, dreamPeople, dreamPeopleArr}
}
module.exports = { matchWord, replaceWord, filterDream }