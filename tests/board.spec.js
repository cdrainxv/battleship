const Ship = require('../src/ship')
const Board = require('../src/board')

describe('gameBoard', () => {
  const board = new Board()
  const shipNames = [
    'carrier',
    'battleship',
    'cruiser',
    'submarine',
    'destroyer'
  ]

  beforeEach(() => {
    board.reset()
  })

  describe('placeShip()', () => {
    beforeEach(() => {
      board.reset()
    })

    it('placeShip() horizontally', () => {
      const coords = board.placeShip('submarine', { x: 0, y: 0 })
      expect(coords).toEqual([{ x: 0, y: 0 }, { x: 3, y: 0 }])
    })

    it('placeShip() vertically', () => {
      const coords = board.placeShip('submarine', { x: 0, y: 0 }, true)
      expect(coords).toEqual([{ x: 0, y: 0 }, { x: 0, y: 3 }])
    })

    it('throws error if overlap', () => {
      board.placeShip('submarine', { x: 0, y: 0 }, true)
      const placeShip = () => {  board.placeShip('cruiser', {x: 0, y: 1}) }
      expect(placeShip).toThrowError(/Coords are taken/)

    })
  })

  describe('attack()', () => {
    beforeEach(() => {
      board.reset()
      board.placeShip('submarine', { x: 5, y: 7 })
    })

    it('returns true if ship hit at coordinate', () => {
      const result = board.attack('5,7')
      expect(result).toBeTruthy()
    })

    it('returns false if ship not hit at coordinate', () => {
      const result = board.attack('8,7')
      expect(result).toBeFalsy()
    })

    it('returns false is coord has already been hit', () => {
      board.attack('5,7')
      const secondHit = board.attack('5,7')
      expect(secondHit).toBeFalsy()
    })
  })

  describe('fleetSunk', () => {
    beforeEach(() => {
      board.reset()
    })

    it('returns true if fleet sunk', () => {
      shipNames.forEach((name, i) => {
        board.placeShip(name, { x: 0, y: i })
        const attackZones = board.location[name]
        attackZones.forEach(zone => {
          board.attack(zone.toString())
        })
      })
      expect(board.fleetSunk()).toBeTruthy()
    })

    it('returns false if fleet not sunk', () => {
      shipNames.forEach((name, i) => {
        board.placeShip(name, { x: 0, y: i })
      })
      board.location['submarine'].forEach(zone => {
        board.attack(zone.toString())
      })
      board.location['cruiser'].forEach(zone => {
        board.attack(zone.toString())
      })
      expect(board.fleetSunk()).toBeFalsy()
    })
  })

  describe('randomShipPlacement()', () => {
    it('should have all the ships in fleet', () => {
      board.randomShipPlacement()
      expect(board.fleet.length).toBe(5)
    })
  })
})
