const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffledDeck = []

    while (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length)
        shuffledDeck.push(deck.splice(randomIndex, 1)[0])
    }

    return shuffledDeck
}

export const createDeck = (): Card[] => {
    const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

    const deck: Card[] = []

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ suit, rank })
        }
    }

    return shuffleDeck(deck)
}

export const calculateScore = (hand: Card[]): number => {
    let score = 0
    let aces = 0

    for (const card of hand) {
        if (card.rank === 'A') {
            aces += 1
            score += 11
        } else if (['K', 'Q', 'J'].includes(card.rank)) {
            score += 10
        } else {
            score += parseInt(card.rank)
        }
    }

    while (score > 21 && aces > 0) {
        score -= 10
        aces -= 1
    }

    return score
}
