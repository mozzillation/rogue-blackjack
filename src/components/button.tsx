'use client'

import { cn } from '@/libs/utils'
import { MouseEvent, PropsWithChildren, useState } from 'react'

type ButtonProps = PropsWithChildren<React.HTMLProps<HTMLDivElement>>

const Button: React.FC<ButtonProps> = ({ className, children, onClick, ...props }) => {
    const [, setIsVibrating] = useState<boolean>(false)

    const handleClickFunction = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsVibrating(true)

        // Check if vibration is supported
        if (navigator && navigator.vibrate) {
            // Vibrate for 200ms, pause for 100ms, then vibrate for 200ms
            navigator.vibrate(50)
        }

        // Reset vibrating state after animation completes
        setTimeout(() => setIsVibrating(false), 100)

        if (e) {
            return onClick?.(e)
        }
    }

    return (
        <div
            className={cn(
                'group relative w-fit bg-accent border-2 border-black outline-2 outline-accent active:translate-y-0.5 active:mt-1 transition-all duration-75 rounded-xs select-none cursor-pointer',
                className,
            )}
            onClick={handleClickFunction}
            {...props}>
            <div className="px-4 py-2 text-black uppercase tracking-wide text-lg text-center">
                {children}
            </div>
            <div className="h-1 bg-black/10 w-full group-active:h-0 transition-all duration-75 border-t-2 border-black group-active:border-0"></div>
        </div>
    )
}

export default Button
