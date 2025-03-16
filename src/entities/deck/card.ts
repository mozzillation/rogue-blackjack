// Card Constants

export const suits = ['hearts', 'diamonds', 'clubs', 'spades']
export const numberedCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10']
export const faceCards = ['J', 'Q', 'K']
export const ranks = [...numberedCards, ...faceCards, 'A']

export const card = (value: string, suit: string): Card => ({
    value,
    suit,
    get isAce() {
        return this.value === 'A'
    },
    get isNumbered() {
        return numberedCards.includes(this.value)
    },
    get isFaced() {
        return faceCards.includes(this.value)
    },
    get rank() {
        return ranks.indexOf(value)
    },
    get points() {
        switch (this.value) {
            case 'A':
                return 11
            case 'K':
            case 'Q':
            case 'J':
                return 10
            default:
                return Number(this.value)
        }
    },
})
