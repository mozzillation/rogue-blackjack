'use client'

import { RootState } from '@/utils/store'
import { setMonsters } from '@/utils/store/slices/monster-slice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const fetchMonsters = async () => {
    // This simulates fetching from an API endpoint
    const res = await fetch('/api/monster/all')
    const data = await res.json()
    return data as MonsterWithDetails[]
}

const HomePage = () => {
    const dispatch = useDispatch()
    const monsters = useSelector((state: RootState) => state.monsters.data)

    useEffect(() => {
        const loadMonsters = async () => {
            const monsterData = await fetchMonsters()
            dispatch(setMonsters(monsterData))
        }

        loadMonsters()
    }, [dispatch])

    return (
        <>
            <h1>Monsters List</h1>
            <ul>
                {monsters.map((monster) => (
                    <li key={monster.id}>
                        {monster.name} - {monster.type} - {monster.rarity} - Weight:{' '}
                        {monster.weight}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default HomePage
