/* eslint-disable @typescript-eslint/indent */
import { memo, type FC, type RefObject } from 'react'
import { FixedSizeList } from 'react-window'

import { classNames } from '@/shared/lib/styles/classNames/classNames'
import ClickOutsideObserver from '@/shared/lib/components/ClickOutsideObserver/ClickOutsideObserver'
import ChevronIcon from '@/shared/assets/icons/chevron.svg'

import styles from './Select.module.scss'
import OptionSelect from './Option'
import { useSelect } from './hooks/useSelect'

export type SelectOption = {
    value: string
    text: string
}

interface SelectProps {
    className?: string
    options: SelectOption[]
    value: string
    onChange: (value: string) => void
    defaultLabel?: string
}

const Select: FC<SelectProps> = memo((props) => {
    const { options, value, onChange, className, defaultLabel = 'Select option' } = props

    const {
        isOpen,
        openList,
        closeList,
        preselectedValue,
        setPreselectedValue,
        handleChange,
        handleMouseEnter,
        buttonRef,
        listRef
    } = useSelect({ onChange, options })

    const label = options.find((o) => o.value === value)?.text || defaultLabel

    const mods = {}

    const additionsClasses = [className]

    return (
        <ClickOutsideObserver
            onClickOutside={closeList}
            className={classNames(styles.container, mods, additionsClasses)}
        >
            <button
                title={label}
                onFocus={(e) => {
                    e.preventDefault()
                }}
                type='button'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                onClick={(e) => {
                    isOpen ? closeList() : openList()
                }}
                className={styles.button}
                ref={buttonRef as unknown as RefObject<HTMLButtonElement>}
            >
                <span>{label}</span>
                <ChevronIcon width={10} height={10} />
            </button>
            {isOpen && (
                <ul
                    role='listbox'
                    tabIndex={-1}
                    className={styles.list}
                    aria-activedescendant={value}
                >
                    <FixedSizeList
                        height={300}
                        width={150}
                        itemSize={44}
                        itemCount={options.length}
                        ref={listRef as unknown as RefObject<FixedSizeList<any>>}
                    >
                        {(ctx) => {
                            const { index, style } = ctx
                            if (preselectedValue !== null) {
                                listRef.current?.scrollToItem?.(preselectedValue)
                            }

                            return (
                                <OptionSelect
                                    onMouseLeave={() => {
                                        setPreselectedValue(null)
                                    }}
                                    style={style}
                                    onMouseMove={handleMouseEnter(index)}
                                    tabIndex={0}
                                    key={options[index].value}
                                    role='option'
                                    aria-selected={index === preselectedValue}
                                    onClick={() => {
                                        handleChange(options[index].value)
                                    }}
                                    className={classNames(styles.item, {
                                        [styles.selectedValue]: options[index].value === value
                                    })}
                                >
                                    {options[index].text}
                                </OptionSelect>
                            )
                        }}
                    </FixedSizeList>
                </ul>
            )}
        </ClickOutsideObserver>
    )
})

export default Select
