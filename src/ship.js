class Ship {
  constructor(name, size) {
    this._name = name
    this._size = size
    this._hitSites = Array(size).fill(false)
  }

  get name() {
    return this._name
  }

  get size() {
    return this._size
  }

  get hitSites() {
    return this._hitSites
  }

  hit(index) {
    if (this._hitSites[index] === undefined || this._hitSites[index]) {
      return false
    } else if (!this._hitSites[index]) {
      this._hitSites[index] = true
      return true
    }
  }

  sunk() {
    return this._hitSites.every(site => site)
  }
}

module.exports = Ship
