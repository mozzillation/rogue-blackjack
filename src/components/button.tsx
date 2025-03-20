'use client'

import { cn } from '@/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { MouseEvent, PropsWithChildren, useState } from 'react'

type ButtonProps = PropsWithChildren<React.HTMLProps<HTMLDivElement>>

const buttonVariants = cva(
    'group relative w-fit active:translate-y-0.5 active:mt-1 transition-all duration-75 rounded-sm select-none cursor-pointer border-2 border-black ring-2',
    {
        variants: {
            variant: {
                default: 'bg-accent ring-accent',
                stand: 'bg-rose-500 ring-rose-500',
                shop: 'bg-yellow-500 ring-yellow-500',
                next: 'bg-green-500 ring-green-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

const Button: React.FC<ButtonProps & VariantProps<typeof buttonVariants>> = ({
    className,
    variant,
    children,
    onClick,
    ...props
}) => {
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
            className={cn(buttonVariants({ variant, className }))}
            onClick={handleClickFunction}
            {...props}>
            <div className="px-4 py-2 text-black uppercase tracking-wider text-lg text-center">
                {children}
            </div>
            <div className="h-1 bg-black/10 w-full group-active:h-0 transition-all duration-75 border-t-2 border-black group-active:border-0"></div>
        </div>
    )
}

export default Button
