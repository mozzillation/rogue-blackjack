import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ScreenView from '@/views/screen-view'
import StoreProvider from '@/store/provider'

const pixelFont = localFont({ src: '../fonts/munro.ttf' })

export const metadata: Metadata = {
    title: {
        default: 'Black Rogue',
        template: 'Black Rogue • %s',
    },
    description: 'A rogue-like game about Black Jack',
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang="en">
            <body className={`${pixelFont.className} antialiased`}>
                <StoreProvider>
                    <ScreenView>{children}</ScreenView>
                </StoreProvider>
            </body>
        </html>
    )
}

export default RootLayout
