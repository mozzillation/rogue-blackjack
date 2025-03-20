import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import StoreProvider from '@/utils/store/provider'
import ScreenView from '@/views/screen-view'

const pixelFont = localFont({ src: '../fonts/munro.ttf' })

export const metadata: Metadata = {
    title: {
        default: 'Rogue Jack',
        template: 'Rogue Jack • %s',
    },
    description: 'A rogue-like game about Black Jack',
}

type RootLayoutProps = {
    children: React.ReactNode
}

const RootLayout: React.FC<Readonly<RootLayoutProps>> = ({ children }) => {
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
