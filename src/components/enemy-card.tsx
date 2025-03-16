'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'

type EnemyCardProps = {
    enemy: Enemy
}

const ROTATION_RANGE = 50
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2

const ENTERING_SPRING_OPTIONS = {
    stiffness: 800,
    damping: 40,
    mass: 1,
}

const MOUSE_SPRING_OPTIONS = {
    stiffness: 500,
    damping: 25,
    mass: 1,
}

const SCALE_SPRING_OPTIONS = {
    stiffness: 500,
    damping: 10,
    mass: 1,
}

const EnemyCard: React.FC<EnemyCardProps> = ({ enemy }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [flipped, setFlipped] = useState<boolean>(false) // State to handle card flip

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const scale = useMotionValue(1)

    const mouseXSpring = useSpring(x, MOUSE_SPRING_OPTIONS)
    const mouseYSpring = useSpring(y, MOUSE_SPRING_OPTIONS)
    const scaleSpring = useSpring(scale, SCALE_SPRING_OPTIONS)

    const transform = useMotionTemplate`rotateX(${mouseXSpring}deg) rotateY(${mouseYSpring}deg) scale(${scaleSpring})`

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return [0, 0]

        scale.set(1.05)

        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * 1
        const rY = (mouseX / width - HALF_ROTATION_RANGE) * -1

        x.set(rX)
        y.set(rY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        scale.set(1)
    }

    const handleCardClick = () => {
        setFlipped((prev) => !prev) // Toggle card flip state
    }

    return (
        <motion.div
            initial={{ y: 500, visibility: 'hidden', scale: 0.7, rotate: 10 }}
            animate={{
                y: 0,
                scale: 1,
                rotate: 0,
                visibility: 'visible',
                transition: { type: 'spring', ...ENTERING_SPRING_OPTIONS, delay: 0.5 },
            }}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
                style={{
                    transformStyle: 'preserve-3d',
                    transform,
                }}
                className={`w-[210px] h-[280px] relative  text-black flex flex-col grow-0`}>
                {/* Card front (visible on default) */}
                <motion.div
                    className={`w-full h-full absolute backface-hidden bg-white border-2 border-black outline-2 outline-white rounded-xs flex flex-col`}
                    animate={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
                    <header className={`w-full h-1/2 border-b-2 border-black bg-black/30`}></header>
                    <main className={`p-2 flex flex-col justify-between grow relative`}>
                        <div className={`text-xl `}>{enemy.name}</div>
                        <footer
                            className={`flex flex-row justify-between items-center content-center`}>
                            <div
                                className={`bg-black text-white text-sm uppercase px-1 py-0.5 tracking-wider rounded-xs`}>
                                {enemy.type}
                            </div>
                            <div className={`flex flex-row`}>
                                {Array.from({ length: enemy.health }).map((_, index) => (
                                    <Image
                                        src="/health.png"
                                        key={index}
                                        width={16}
                                        height={16}
                                        alt="Enemy's Health"
                                    />
                                ))}
                            </div>
                        </footer>
                    </main>
                </motion.div>
                <motion.div
                    className={`w-full h-full absolute bg-white border-2 border-black outline-2 outline-white text-black rounded-xs backface-hidden`}
                    animate={{ transform: flipped ? 'rotateY(0)' : 'rotateY(180deg)' }}>
                    <div className="flex justify-center items-center h-full">
                        <div>Malus:</div>
                        <div>{enemy.modifiers.malus?.type}</div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default EnemyCard
