'use client'

import { cn } from '@/utils'
import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { motion } from 'motion/react'

const outcomeVariants = cva(
    'text-black text-xl p-2 rounded-xs border-2 border-black ring-2 w-fit animate-pulse tracking-wider uppercase',
    {
        variants: {
            variant: {
                tie: 'bg-zinc-500 ring-zinc-500',
                won: 'bg-green-500 ring-green-500',
                lost: 'bg-rose-500 ring-rose-500',
                blackjack: 'bg-green-500 ring-green-500',
            },
        },

        defaultVariants: {
            variant: 'tie',
        },
    },
)

const Outcome: React.FC<VariantProps<typeof outcomeVariants>> = ({ variant }) => {
    const result = () => {
        switch (variant) {
            case 'won':
                return 'You won!'
            case 'lost':
                return 'You lost!'
            case 'tie':
                return "It's a tie!"
            case 'blackjack':
                return 'Blackjack!'
            default:
                return 'Uh-oh...'
        }
    }

    return (
        <motion.div
            className={cn(
                `w-full h-full flex flex-col items-center content-center justify-center rounded-sm relative`,
                variant === 'tie' && `bg-zinc-800`,
                variant === 'won' && `bg-green-950/20`,
                variant === 'lost' && `bg-rose-950/20`,
                variant === 'blackjack' && `bg-green-950/20`,
            )}>
            <motion.h1
                animate={{
                    rotate: [-10, 0],
                    transition: {
                        repeat: Infinity,
                        repeatDelay: 1,
                        type: 'spring',
                        stiffness: 500,
                        damping: 10,
                        mass: 1,
                    },
                }}
                className={clsx(outcomeVariants({ variant }))}>
                {result()}
            </motion.h1>
        </motion.div>
    )
}

export default Outcome
