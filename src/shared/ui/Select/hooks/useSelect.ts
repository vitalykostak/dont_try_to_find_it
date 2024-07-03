import { type MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { type FixedSizeList } from 'react-window'

import { type SelectOption } from '../Select'

type UseSelectProps = {
    options: SelectOption[]
    onChange: (value: string) => void
}

export const useSelect = (props: UseSelectProps) => {
    const { options, onChange } = props

    const [isOpen, setOpen] = useState<boolean>(false)
    const [preselectedValue, setPreselectedValue] = useState<number | null>(null)
    const listRef = useRef<FixedSizeList<any>>()
    const buttonRef = useRef<HTMLButtonElement>()

    const openList = useCallback(() => {
        setOpen(true)
    }, [])

    const closeList = useCallback(() => {
        setOpen(false)
        setPreselectedValue(null)
    }, [])

    const handleChange = useCallback(
        (value: string) => {
            closeList()
            onChange(value)
        },
        [closeList, onChange]
    )

    const handleMouseEnter =
        (index: number): MouseEventHandler<HTMLDivElement> =>
            (_) => {
                setPreselectedValue(index)
            }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            buttonRef.current?.blur()
            if (['Enter', 'SpaceBar', ' '].includes(e.key) && preselectedValue !== null) {
                handleChange(options[preselectedValue].value)

                return
            }

            if (e.key === 'ArrowUp') {
                setPreselectedValue((prev) => {
                    if (prev === null) {
                        return options.length - 1
                    }
                    return prev - 1 < 0 ? 0 : prev - 1
                })
                return
            }
            if (e.key === 'ArrowDown') {
                setPreselectedValue((prev) => {
                    if (prev === null) {
                        return 0
                    }
                    return prev + 1 > options.length - 1 ? options.length - 1 : prev + 1
                })

                return
            }
            if (['Tab', 'Home'].includes(e.key)) {
                setPreselectedValue(0)
                return
            }
            if (e.key === 'End') {
                setPreselectedValue(options.length - 1)
                return
            }

            if (e.key === 'Escape') {
                closeList()
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', listener)
        }

        return () => {
            window.removeEventListener('keydown', listener)
        }
    }, [isOpen, preselectedValue, handleChange, closeList, options, onChange])

    return {
        isOpen,
        handleChange,
        preselectedValue,
        setPreselectedValue,
        handleMouseEnter,
        openList,
        closeList,
        listRef,
        buttonRef
    }
}
