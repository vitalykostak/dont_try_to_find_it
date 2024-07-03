import { memo, useMemo, useState, type FC } from 'react'

import { classNames } from '@/shared/lib/styles/classNames/classNames'
import Select, { type SelectOption } from '@/shared/ui/Select/Select'

interface NamesSelectorProps {
    className?: string
}

const ThousandsItemsSelector: FC<NamesSelectorProps> = memo((props) => {
    const { className } = props
    const [selected, setSelected] = useState<string>('')

    const mods = {}

    const additionsClasses = [className]

    const options = useMemo<SelectOption[]>(() => {
        return new Array(100000)
            .fill(null)
            .map((_, i) => ({ value: `item${i + 1}`, text: `Item ${i + 1}` }))
    }, [])

    return (
        <>
            <Select
                defaultLabel='Thousands items'
                onChange={setSelected}
                value={selected}
                options={options}
                className={classNames('', mods, additionsClasses)}
            />
        </>
    )
})

export default ThousandsItemsSelector
