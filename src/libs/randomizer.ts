// Convert an alphanumeric seed to a numeric value
export const stringToSeed = (seed: string): number => {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
    }
    return hash
}

// Mulberry32 PRNG (deterministic)
export const mulberry32 = (seed: number): (() => number) => {
    return function () {
        seed |= 0
        seed = (seed + 0x6d2b79f5 + (seed >> 1)) | 0 // Slight variation per level
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}
