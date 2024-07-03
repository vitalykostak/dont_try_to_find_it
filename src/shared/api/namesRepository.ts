import { $api } from './api'

export type NameDto = {
    objectId: string
    Name: string
    createdAt: string
    updatedAt: string
}

export const fetchNamesList = async (): Promise<NameDto[]> => {
    const res = await $api<{ results: NameDto[] }>(
        'https://parseapi.back4app.com/classes/Complete_List_Names?limit=10&keys=Name'
    )

    return res.data.results
}
