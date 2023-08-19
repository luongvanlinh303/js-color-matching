import { GAME_STATUS, PAIRS_COUNT } from './constants.js'
import { getRandomColorPairs } from './utils.js'
import { getColorElementList, getColorListElement } from './selectors.js'

// Global variables
let selections = []
let gameState = GAME_STATUS.PLAYING

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function handleColorClick(liELement) {
  if (!liELement) return

  liELement.classList.add('active')
}

function initColors() {
  // random 8 pairs of colors
  const colorList = getRandomColorPairs(PAIRS_COUNT)

  // bind to li > div.overlay
  const liList = getColorElementList()

  liList.forEach((liELement, index) => {
    const overlayElement = liELement.querySelector('.overlay')

    if (overlayElement) overlayElement.style.backgroundColor = colorList[index]
  })
}

function attachEventForColorList() {
  const ulElement = getColorListElement()

  if (!ulElement) return

  // event delegation
  ulElement.addEventListener('click', (event) => {
    handleColorClick(event.target)
  })
}

// main
;(() => {
  initColors()

  attachEventForColorList()
})()
