const QUESTS_KEY = 'quests'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest;




function createQuestsTree() {
    if (!localStorage.getItem('quests')) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    } else {
        gQuestsTree = loadQuestsFromStorage()
    }
    gCurrQuest = gQuestsTree;
    saveToStorage(QUESTS_KEY, gQuestsTree)
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = (res === 'yes') ? gCurrQuest.yes : gCurrQuest.no
        //  updates the gPrevQuest, gCurrQuest global vars
}


function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt)
    if (lastRes === 'yes') {
        gPrevQuest.yes = newQuest
        newQuest.yes = createQuest(newGuessTxt)
        newQuest.no = gCurrQuest
    } else {
        gPrevQuest.no = newQuest
        newQuest.yes = createQuest(newGuessTxt)
        newQuest.no = gCurrQuest
    }
    saveQuestsToStorage()
}


function getCurrQuest() {
    return gCurrQuest
}

function restartQuests() {
    gCurrQuest = gQuestsTree
}


function saveQuestsToStorage() {
    saveToStorage(QUESTS_KEY, gQuestsTree)
}

function loadQuestsFromStorage() {
    return loadFromStorage(QUESTS_KEY)
}