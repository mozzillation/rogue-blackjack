'use client'

import { cn } from '@/utils'
import { useAppSelector } from '@/utils/store/hooks'
import { ClassValue } from 'clsx'
import { useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'
import { motion } from 'motion/react'

const ROTATION_RANGE = 15

const mouseSpringOptions = {
    stiffness: 500,
    damping: 25,
    mass: 1,
}

const scaleSpringOptions = {
    stiffness: 500,
    damping: 10,
    mass: 1,
}

const MonsterCard = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const scale = useMotionValue(1)

    const mouseXSpring = useSpring(x, mouseSpringOptions)
    const mouseYSpring = useSpring(y, mouseSpringOptions)
    const scaleSpring = useSpring(scale, scaleSpringOptions)

    const transform = useMotionTemplate`
        perspective(900px) 
        rotateX(${mouseYSpring}deg) 
        rotateY(${mouseXSpring}deg) 
        scale(${scaleSpring})`

    const { monster } = useAppSelector((state) => state.game)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return

        scale.set(1.05) // Slight zoom-in on hover

        const rect = ref.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Normalize values from -1 to 1
        const normalizedX = (offsetX - centerX) / centerX
        const normalizedY = (offsetY - centerY) / centerY

        // Flip Y-axis for natural movement (mouse down tilts forward)
        const rX = normalizedY * -ROTATION_RANGE
        const rY = normalizedX * ROTATION_RANGE

        x.set(rY)
        y.set(rX)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        scale.set(1)
    }

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
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                transform,
            }}
            className={`bg-white aspect-[5/7] w-full max-w-[240px] rounded-sm border-2 border-black ring-2 ring-white flex flex-col p-2 gap-2 tracking-wider shadow-2xl`}>
            <figure className={`w-full grow bg-accent rounded-xs`} />
            <header className={`text-black uppercase`}>
                <h1>{monster.name}</h1>
            </header>
            <footer className={`text-black flex flex-col gap-1`}>
                <div
                    className={`flex flex-row justify-between gap-2 w-full border-t-2 border-black/20 border-dotted pt-1`}>
                    <div className={`uppercase text-black/80`}>Type</div>
                    <div className={`uppercase`}>{monster.type}</div>
                </div>
                <div
                    className={`flex flex-row justify-between gap-2 w-full border-t-2 border-black/20 border-dotted pt-1`}>
                    <div className={`uppercase text-black/80`}>Rarity</div>
                    <div className={cn('uppercase', rarityStyle())}>{monster.rarity}</div>
                </div>
            </footer>
        </motion.div>
    )
}

export default MonsterCard
