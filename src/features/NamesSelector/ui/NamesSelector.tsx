import { memo, useMemo, useState, type FC } from 'react'

import { mapNameTypeToSelectOption, useNamesList } from '@/entities/Name'
import { classNames } from '@/shared/lib/styles/classNames/classNames'
import Select from '@/shared/ui/Select/Select'

interface NamesSelectorProps {
    className?: string
}

const NamesSelector: FC<NamesSelectorProps> = memo((props) => {
    const { className } = props
    const [selected, setSelected] = useState<string>('')

    const { namesList, namesListLoading } = useNamesList()

    const options = useMemo(() => mapNameTypeToSelectOption(namesList), [namesList])

    const mods = {}

    const additionsClasses = [className]

    if (namesListLoading) {
        return 'Loading'
    }

    return (
        <Select
            defaultLabel='Fetched names'
            onChange={setSelected}
            value={selected}
            options={options}
            className={classNames('', mods, additionsClasses)}
        />
    )
})

export default NamesSelector
