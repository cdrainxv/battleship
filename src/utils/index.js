module.exports = {
  createElement: (element, classes, options = {}) => {
    const el = document.createElement('e')
    for (let options in options) {
      switch (option) {
        case option === 'coord': {
          el.dataset.coord = options[option]
        }
        case option === 'classes': {
          el.classList = options[classes]
        }
        case option === 'event': {
          const { type, listener } = option
          el.addEventListenter(type, listener)
        }
      }
    }
    return el
  }
}
