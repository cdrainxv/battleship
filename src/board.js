const Ship = require('./ship')

module.exports = class Board {
  constructor() {
    this._width = 10
    this._height = 10
    this._cells = {}
    this._location = {}
    this._fleet = []
    this.gameShips = {
      carrier: 5,
      battleship: 4,
      cruiser: 4,
      submarine: 3,
      destroyer: 2
    }
  }

  get cells() {
    return this._cells
  }

  get fleet() {
    return this._fleet
  }

  get location() {
    return this._location
  }

  reset() {
    this._location = {}
    this._fleet = []
    this._cells = []
  }

  fleetSunk() {
    return Object.values(this.cells).every(ship => ship.sunk())
  }

  /**
   * @params shipLog {ship: Ship, coords: shipCoords }
   * returns undefined
   */
  addToLoc(type, shipCoords) {
    this.location[type] = shipCoords
  }

  status(coords) {
    return this.cells[coords]
  }

  /**
   * @params bow      Object{x, y}
   * @params ship     Object Ship
   * @params vertical Boolean
   * @return start and end x and y coordinates of ship
   */
  shipCoords(start, size, vertical) {
    let { x, y } = start
    if (vertical) return [{ x, y }, { x, y: y + size }]
    return [{ x, y }, { x: x + size, y }]
  }

  crossedPaths(coords) {
    coords.forEach(coord => {
      const { x, y } = coord
      if (x >= this.width || y >= this.height) {
        throw new Error('Ship Out of Board Bounds')
      }

      if (this.cells[`${x},${y}`]) {
        throw new Error(`${(x, y)} is used by a ship`)
      }
    })
  }

  shipCoordsRange(bow, stern, vertical) {
    const axis = vertical ? 'y' : 'x'
    const coords = []
    for (let i = bow[axis]; i < stern[axis]; i++) {
      const point = axis == 'y' ? [bow.x, i] : [i, bow.y]
      coords.push(point)
    }
    return coords
  }

  addToCells(ship, coords) {
    coords.forEach(coord => {
      const [x, y] = coord
      this.cells[coord] = ship
    })
  }

  addToFleet(ship) {
    this.fleet.push(ship)
  }

  /**
   * @params shipType:   this.gameShips
   * @params bow:        Object{x, y}
   * @params vertical:   Boolean
   * @return shipCoords: [{x, y} , {x, y]
   */
  placeShip(shipType, start, vertical = false) {
    const size = this.gameShips[shipType]
    const ship = new Ship(shipType, size)
    const shipCoords = this.shipCoords(start, ship.size, vertical)

    try {
      this.crossedPaths(shipCoords)
    } catch (e) {
      throw new Error('Coords are taken')
    }

    const [bow, stern] = shipCoords
    const coords = this.shipCoordsRange(bow, stern, vertical)
    this.addToLoc(shipType, coords)
    this.addToFleet(ship)
    this.addToCells(ship, coords)
    return shipCoords
  }

  findAttackIndex(name, coord) {
    const shipCoords = this.location[name]
    const iterator = shipCoords.entries()
    for (let e of iterator) {
      const [i, val] = e
      if (val.toString() == coord) {
        return i
      }
    }
  }

  attack(coord) {
    const ship = this.status(coord)
    if (ship) {
      const index = this.findAttackIndex(ship.name, coord)
      return ship.hit(index)
    }
  }

  randomVal(max) {
    return Math.floor(Math.random() * max)
  }

  randomShipPlacement() {
    const shipNames = Object.keys(this.gameShips)
    const vertical = this.randomVal(1000) % 2 == 0
    while (shipNames.length > 0) {
      let name = shipNames.pop()
      let [x, y] = [this.randomVal(this._width), this.randomVal(this._height)]
      try {
        this.placeShip(name, { x, y }, vertical)
      } catch (e) {
        shipNames.push(name)
      }
    }
  }
}
