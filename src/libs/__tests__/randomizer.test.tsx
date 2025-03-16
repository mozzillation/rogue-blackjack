import { mulberry32, stringToSeed } from '../randomizer'

// stringToSeed()

describe('stringToSeed()', () => {
    it('should convert a string into a numeric seed', () => {
        expect(stringToSeed('hello')).toBe(99162322)
        expect(stringToSeed('world')).toBe(113318802)
        expect(stringToSeed('123ABC')).toBe(1450588368)
    })

    it('should return the same seed for the same input', () => {
        const input = 'testString'
        expect(stringToSeed(input)).toBe(stringToSeed(input))
    })

    it('should return different seeds for different inputs', () => {
        expect(stringToSeed('apple')).not.toBe(stringToSeed('orange'))
    })

    it('should return 0 for an empty string', () => {
        expect(stringToSeed('')).toBe(0)
    })
})

// mulberry32()

describe('mulberry32()', () => {
    it('should generate the same sequence for the same seed', () => {
        const rng1 = mulberry32(12345)
        const rng2 = mulberry32(12345)

        expect(rng1()).toBeCloseTo(rng2(), 10)
        expect(rng1()).toBeCloseTo(rng2(), 10)
        expect(rng1()).toBeCloseTo(rng2(), 10)
    })

    it('should generate different sequences for different seeds', () => {
        const rng1 = mulberry32(12345)
        const rng2 = mulberry32(54321)

        expect(rng1()).not.toBeCloseTo(rng2(), 10)
        expect(rng1()).not.toBeCloseTo(rng2(), 10)
        expect(rng1()).not.toBeCloseTo(rng2(), 10)
    })

    it('should return values within range [0, 1]', () => {
        const rng = mulberry32(9999)
        for (let i = 0; i < 1000; i++) {
            const value = rng()
            expect(value).toBeGreaterThanOrEqual(0)
            expect(value).toBeLessThan(1)
        }
    })

    it('should return a valid sequence for a zero seed', () => {
        const rng = mulberry32(0)
        expect(rng()).toBeGreaterThanOrEqual(0)
        expect(rng()).toBeLessThan(1)
    })
})
