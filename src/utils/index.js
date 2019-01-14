module.exports = {
  createElement: (element, options = {}) => {
    const el = document.createElement(element)
    for (let option in options) {
      if (option === 'coord') {
        el.dataset.coord = options[option]
      }

      if (option === 'classes') {
        el.classList = options[classes]
      }

      if (option === 'parent') {
        options[option].appendChild(el)
      }

      if (option === 'styles') {
        Object.keys(options[option]).forEach(style => {
          el.style[style] = options[option][style]
        })
      }
    }
    return el
  }
}
