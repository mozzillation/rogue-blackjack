'use client'

import { cn } from '@/utils'
import { useAppSelector } from '@/utils/store/hooks'
import { ClassValue } from 'clsx'

const MonsterCard = () => {
    const { monster } = useAppSelector((state) => state.game)

    if (!monster) return null

    const rarityStyle = (): ClassValue => {
        switch (monster.rarity) {
            case 'mythic':
                return 'text-red-400'
            case 'legendary':
                return 'text-orange-400'
            case 'epic':
                return 'text-purple-400'
            case 'rare':
                return 'text-blue-400'
            case 'uncommon':
                return 'text-green-400'
            default:
                return 'text-black'
        }
    }

    return (
        <article
            id={`monster-${monster.id}`}
            className={`bg-white aspect-[5/7] w-full max-w-[240px] rounded-sm border-2 border-zinc-800 ring-2 ring-white flex flex-col p-2 gap-2 tracking-wider shadow-2xl`}>
            <figure className={`w-full grow bg-zinc-100 rounded-xs`} />
            <header className={`text-black uppercase`}>
                <h1>{monster.name}</h1>
            </header>
            <footer className={`text-black flex flex-col gap-1`}>
                <div
                    className={`flex flex-row justify-between gap-2 w-full border-t-2 border-zinc-200 border-dotted pt-1`}>
                    <div className={`uppercase text-zinc-500`}>Type</div>
                    <div className={`uppercase`}>{monster.type}</div>
                </div>
                <div
                    className={`flex flex-row justify-between gap-2 w-full border-t-2 border-zinc-200 border-dotted pt-1`}>
                    <div className={`uppercase text-zinc-500`}>Rarity</div>
                    <div className={cn('uppercase', rarityStyle())}>{monster.rarity}</div>
                </div>
            </footer>
        </article>
    )
}

export default MonsterCard
