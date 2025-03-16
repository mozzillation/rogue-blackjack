export const calculateScore = (cards: Card[]): number => {
    let score = cards.reduce((score, card) => score + card.points, 0)

    cards
        .filter((c) => c.value === 'A')
        .forEach(() => {
            if (score > 21) {
                score -= 10
            }
        })

    return score
}
