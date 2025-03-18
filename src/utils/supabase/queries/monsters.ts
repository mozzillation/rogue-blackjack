import { extendsMonstersWithDetails } from '@/utils/helpers/builder'
import { createClient } from '../client'

export const getAllMonsters = async (): Promise<SupabaseResponse<MonsterWithDetails[]>> => {
    const supabase = createClient()

    try {
        // Fetch monsters from Supabase
        const { data, error } = await supabase.from('monsters').select('*').limit(300)

        // If there's an error, return it with data as null
        if (error) {
            console.error('Error fetching monsters:', error)
            return { data: null, error }
        }

        return { data: extendsMonstersWithDetails(data), error: null }
    } catch (error) {
        console.error('Unexpected error fetching monsters:', error)
        return { data: null, error }
    }
}
