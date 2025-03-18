import { extendsMonstersWithDetails } from '@/utils/helpers/builder'
import { getAllMonsters } from '@/utils/supabase/queries/monsters'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export const GET = async () => {
    try {
        const { data, error } = await getAllMonsters()

        if (error) {
            console.error('Error fetching monsters:', error)
            return NextResponse.json({ message: 'Failed to fetch monsters' }, { status: 500 })
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ message: 'No monsters found' }, { status: 404 })
        }

        const extendedMonstersWithDetails = extendsMonstersWithDetails(data)

        return NextResponse.json(extendedMonstersWithDetails)
    } catch (err) {
        console.error('Unexpected error:', err)
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
    }
}
