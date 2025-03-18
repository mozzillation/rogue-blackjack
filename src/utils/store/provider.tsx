'use client'

import { Provider } from 'react-redux'
import store from '.'

const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
