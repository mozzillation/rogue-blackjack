import { Transition } from 'motion/react'

export const screenSpringOptions: Transition = {
    type: 'spring',
    stiffness: 800,
    damping: 50,
    mass: 1,
}
