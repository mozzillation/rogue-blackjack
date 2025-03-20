'use client'

import { useEffect } from 'react'

const ScreenView: React.FC<React.PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        import('ios-vibrator-pro-max').catch((err) =>
            console.error('Failed to load vibration library:', err),
        )
    }, [])
    return (
        <div
            className={`min-h-svh min-w-svw h-full w-full relative flex items-center content-center justify-center select-none bg-zinc-950`}>
            <div
                className={`relative h-full sm:h-auto sm:max-w-[390px] sm:aspect-[9/16] w-full rounded-2x overflow-hidden`}>
                {children}
            </div>
            <div className="crt absolute inset-0 pointer-events-none z-20" />
        </div>
    )
}

export default ScreenView
