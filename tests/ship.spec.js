const Ship = require('../src/ship')

describe('ship', () => {
  let sub
  beforeEach(() => {
    sub = new Ship('sub', 5)
  })

  it('is hit at specific location within range', () => {
    expect(sub.hit(1)).toBeTruthy()
  })

  it('is hit at specific location out of range', () => {
    expect(sub.hit(5)).toBeFalsy()
  })

  it('is hit 1 out of 5 times', () => {
    sub.hit(1)
    expect(sub.sunk()).toBeFalsy()
  })

  it('is hit 4 out of 5 times', () => {
    for (let i = 0; i < 4; i++) {
      sub.hit(i)
    }

    expect(sub.sunk()).toBeFalsy()
  })

  it('is hit 5 out of 5 times', () => {
    for (let i = 0; i < 5; i++) {
      sub.hit(i)
    }

    expect(sub.sunk()).toBeTruthy()
  })
})
