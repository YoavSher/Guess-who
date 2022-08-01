const STORAGE_KEY = 'questsDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null
var gLastRes
// _createQuestsTree()


// function getQuestsToDisplay() {
//   return gQuestsTree

// }

function createQuestsTree() {
   gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    _saveQuestsToStorage()
  }

  gCurrQuest = gQuestsTree
  gPrevQuest = null
  // gQuestsTree = quests
  console.log('create tree:', gQuestsTree)
  return gQuestsTree
  // return gCurrQuest
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
  console.log(gCurrQuest);
  console.log('gPrevQuest:', gPrevQuest)
  // TODO: update the gPrevQuest, gCurrQuest global vars
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // console.log('lastRes:', lastRes)
  console.log('gCurrQuest:', gCurrQuest)
  console.log(gPrevQuest);
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gPrevQuest[lastRes]
  gPrevQuest[lastRes] = newQuest
  console.log('gQuestsTree:', gQuestsTree)
  _saveQuestsToStorage()
  // gCurrQuest = gQuestsTree
  // TODO: Create and Connect the 2 Quests to the quetsions tree
}

function getCurrQuest() {
  return gCurrQuest
}

// function restartGame() {
//   gCurrQuest = gQuestsTree
//   gLastRes = null
// }


function _saveQuestsToStorage() {

  saveToStorage(STORAGE_KEY, gQuestsTree)
}