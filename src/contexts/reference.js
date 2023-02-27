import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export const getReferenceContext = React.createContext();

export const ReferenceContextProvider = (props) => {

    const header = React.useRef()
    const [isLoading, setIsLoading] = React.useState(false)
    const [headerHeight, setHeaderHeight] = React.useState(54)
    React.useEffect(() => {
        calcHeaderHeight()
    }, [])
    const calcHeaderHeight = () => {
        const target = header.current
        if (target) setHeaderHeight(target.offsetHeight)
    }
    return (
        <getReferenceContext.Provider value={{
            header,
            headerHeight,
            setIsLoading
        }}>
            {isLoading && <TailSpin
                height="40"
                width="40"
                color="#EA3038"
                ariaLabel="loading-spinner"
                radius="1"
                visible={true}
            />}
            {props.children}
        </getReferenceContext.Provider>
    )

}