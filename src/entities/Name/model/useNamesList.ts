import { useEffect, useState } from 'react'

import { fetchNamesList } from '@/shared/api/namesRepository'

import { mapNameDtoToNameType } from '../libs/mappers'

import { type Name } from './type'

export const useNamesList = () => {
    const [namesList, setList] = useState<Name[]>([])
    const [namesListLoading, setLoading] = useState<boolean>(false)
    const [namesListError, setError] = useState<string>('')

    useEffect(() => {
        const effect = async () => {
            try {
                setLoading(true)
                const res = await fetchNamesList()
                setList(mapNameDtoToNameType(res))
            } catch (error) {
                setError('Something went wrong')
            } finally {
                setLoading(false)
            }
        }

        void effect()
    }, [])

    return { namesList, namesListError, namesListLoading }
}
