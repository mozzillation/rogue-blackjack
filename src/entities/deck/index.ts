import { card } from './card'
import { ranks, suits } from './card'

export const deck = (): Deck => {
    const deck: Card[] = []

    for (const suit of suits) {
        for (const value of ranks) {
            deck.push(card(value, suit))
        }
    }

    return {
        get shuffle() {
            const shuffledDeck: Card[] = []

            while (deck.length > 0) {
                const randomIndex = Math.floor(Math.random() * deck.length)
                shuffledDeck.push(deck.splice(randomIndex, 1)[0])
            }

            return shuffledDeck
        },
    }
}
