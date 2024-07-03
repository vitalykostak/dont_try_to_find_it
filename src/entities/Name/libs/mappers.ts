import { type NameDto } from '@/shared/api/namesRepository'
import { type SelectOption } from '@/shared/ui/Select/Select'

import { type Name } from '../model/type'

export const mapNameDtoToNameType = (names: NameDto[]): Name[] =>
    names.map((n) => ({ id: n.objectId, name: n.Name }))

export const mapNameTypeToSelectOption = (names: Name[]): SelectOption[] =>
    names.map((n) => ({ value: n.id, text: n.name }))
