class Ship {
  constructor(name, size) {
    this._name = name
    this._size = size
    this.hitSites = Array(5).fill(false)
  }

  get name() {
    return this._name
  }

  get size() {
    return this._size
  }

  hit(index) {
    if (this.hitSites[index] === undefined) {
      return false
    } else if (!this.hitSites[index]) {
      this.hitSites[index] = true
      return true
    }
  }

  sunk() {
    return this.hitSites.every(site => site)
  }
}

module.exports = Ship
