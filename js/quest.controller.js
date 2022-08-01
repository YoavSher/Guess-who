'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.new-game').click(handleModal)
$('.contact').click(() => { window.location = 'contact.html' })

function init() {
  console.log('Started...')
  // $('.end-modal').hide()
  gLastRes = null
  createQuestsTree()
  // getQuestsToDisplay()
}

function onStartGuessing() {

  // TODO: hide the game-start section
  $('.btn-start').hide()
  renderQuest()
  // TODO: show the quest section
}

function renderQuest() {
  const $elQuest = $('.quest')
  console.log('gCurrQuest.txt:', gCurrQuest.txt)
  const $elQuestTitle = $('.quest h2').text(gCurrQuest.txt)

  $elQuest.show()
  // $elQuest.children('h2').text(gCurrQuest.txt)
  // console.log('gCurrQuest.txt:', gCurrQuest.txt)
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
}

function onUserResponse(ev) {
  // console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // alert('Yes, I knew it!')
      $('.quest').hide()
      $('.end-modal').show()
      // TODO: improve UX
    } else {
      // alert('I dont know...teach me!')
      $('.new-quest').show()
      // TODO: hide and show new-quest section
    }
  } else {

    gLastRes = res
    // TODO: update the lastRes global var
    moveToNextQuest(res)
    // onRestartGame()
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  console.log('newGuess:', newGuess)
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  $('#newGuess').val('')
  $('#newQuest').val('')
  init()
  renderQuest()
}

function handleModal() {
  // console.log('modal');
  init()
  renderQuest()
  $('.end-modal').hide()
}
