import { createElement } from './utils'
import Board from './board'

const clickEvent = (e, board) => {
  const el = e.target
  const coord = el.dataset.coord

  if (board.attack(coord)) {
    el.style.backgroundColor = 'red'
  } else el.style.backgroundColor = 'white'
}

const addEvent = (el, board, listener, type = 'click') => {
  el.addEventListener(
    type,
    e => {
      e.stopPropagation()
      listener(e, board)
    },
    { once: true }
  )
}

const createBoard = (width = 10, height = 10) => {
  const div = createElement('div', {
    styles: {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 25px)',
      gridTemplateRows: 'repeat(10, 25px)',
      gridGap: '2px',
      width: '268px',
      margin: '0 auto'
    }
  })

  let row = 0
  const cells = Array(width * height)
    .fill('')
    .map((cell, index) => {
      const y = Math.floor(index % height)
      const mark = createElement('button', {
        coord: `${row},${y}`,
        styles: {
          backgroundColor: 'cyan',
          width: '25px',
          height: '25px',
          outline: 'none'
        },
        parent: div
      })

      if (y === width - 1) row++

      return mark
    })
  return { div, cells }
}

export const game = (() => {
  const board = new Board()
  const main = document.getElementById('game')
  board.randomShipPlacement()
  const { div, cells } = createBoard()

  cells.forEach(cell => {
    addEvent(cell, board, clickEvent)
  })

  main.appendChild(div)
})()
