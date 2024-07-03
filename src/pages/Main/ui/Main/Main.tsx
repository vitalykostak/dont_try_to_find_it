import { memo, type FC } from 'react'

import { Page } from '@/widgets/Page'
import { NamesSelector } from '@/features/NamesSelector'
import { ThousandsItemsSelector } from '@/features/ThousandsItemsSelector'

import styles from './Main.module.scss'

type MainProps = {
    className?: string
}

const Main: FC<MainProps> = memo(() => {
    return (
        <Page className={styles.container}>
            <NamesSelector />
            <ThousandsItemsSelector />
        </Page>
    )
})

export default Main
