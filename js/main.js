import { GAME_STATUS, PAIRS_COUNT } from './constants.js'
import { getRandomColorPairs } from './utils.js'
import { getColorElementList, getColorListElement, getInActiveColorList } from './selectors.js'

// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

// handleColorClick 1
// handleColorClick 2
// handleColorClick 3
// setTimeout 2 --> reset selections
// setTimeout 3 --> errors here
function handleColorClick(liELement) {
  const shouldBlockCick = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus)

  if (!liELement || shouldBlockCick) return

  // show clicked cell to selections
  liELement.classList.add('active')

  // save clicked cell to selections
  selections.push(liELement)
  if (selections.length < 2) return

  // check match
  const firstColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color
  const isMatch = firstColor === secondColor

  if (isMatch) {
    // check win
    const isWin = getInActiveColorList().length === 0
    if (isWin) {
      // show replay
      // show You WIN
    }

    selections = []
    return
  }

  // in case of not match
  // remove active class for 2 li elements
  gameStatus = GAME_STATUS.BLOCKING

  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')

    // reset selections for the next turn
    selections = []

    gameStatus = GAME_STATUS.PLAYING
  }, 500)
}

function initColors() {
  // random 8 pairs of colors
  const colorList = getRandomColorPairs(PAIRS_COUNT)

  // bind to li > div.overlay
  const liList = getColorElementList()

  liList.forEach((liELement, index) => {
    liELement.dataset.color = colorList[index]

    const overlayElement = liELement.querySelector('.overlay')

    if (overlayElement) overlayElement.style.backgroundColor = colorList[index]
  })
}

function attachEventForColorList() {
  const ulElement = getColorListElement()

  if (!ulElement) return

  // event delegation
  ulElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return
    handleColorClick(event.target)
  })
}

// main
;(() => {
  initColors()

  attachEventForColorList()
})()
