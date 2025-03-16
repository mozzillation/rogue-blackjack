'use client'

import { cn } from '@/libs/utils'
import { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<React.HTMLProps<HTMLDivElement>>

const Button: React.FC<ButtonProps> = ({ className, children, onClick, ...props }) => {
    return (
        <div
            className={cn(
                'group relative w-fit bg-accent border-2 border-black outline-2 outline-accent active:translate-y-0.5 active:mt-1 transition-all duration-75 rounded-xs select-none cursor-pointer',
                className,
            )}
            onClick={onClick}
            {...props}>
            <div className="px-4 py-2 text-black uppercase tracking-wide text-lg text-center">
                {children}
            </div>
            <div className="h-1 bg-black/10 w-full group-active:h-0 transition-all duration-75 border-t-2 border-black group-active:border-0"></div>
        </div>
    )
}

export default Button
