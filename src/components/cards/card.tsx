'use client'

type CardProps = Card

const Card: React.FC<CardProps> = ({ suit, rank }) => {
    return (
        <article
            id={`card-${suit}-${rank}`}
            className={`w-full max-w-[50px] aspect-[5/7] bg-white rounded-sm border-2 border-black ring-2 ring-white text-black flex flex-row items-center content-center justify-center grow`}>
            {rank}
        </article>
    )
}

export default Card
