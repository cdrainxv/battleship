const { createElement } = require('./utils/index')

const createBoard = (width = 10, height = 10) => {
  const div = createElement('div', {
    styles: {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 25px)',
      gridTemplateRows: 'repeat(10, 25px)',
      gridGap: '2px',
      width: '270px',
      margin: '0 auto'
    }
  })

  const cells = Array(width * height)
    .fill('')
    .map((cell, index) => {
      const x = index % width
      const y = Math.floor(index % height)
      const mark = createElement('button', {
        coord: `${x},${y}`,
        styles: { backgroundColor: 'cyan', width: '25px', height: '25px' },
        parent: div
      })
      return mark
    })
  return div
}

module.exports = createBoard
