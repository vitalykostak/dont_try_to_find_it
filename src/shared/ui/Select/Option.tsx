import { type LiHTMLAttributes, type FC } from 'react'

interface OptionProps extends LiHTMLAttributes<HTMLDivElement> {
    className?: string
}

const OptionSelect: FC<OptionProps> = (props) => {
    const { style, className, children, ...other } = props

    return (
        <li style={style}>
            <div {...other} className={className}>
                {children}
            </div>
        </li>
    )
}

export default OptionSelect
