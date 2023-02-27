import React from 'react'

export const getReferenceContext = React.createContext();

export const ReferenceContextProvider = (props) => {

    const Canvas = React.useRef()
    const Highlight = React.useRef()
    const Indicator = React.useRef()
    const SelectedBlock = React.useRef()
    const lastPointer = React.useRef()
    const lastAddElement = React.useRef()
    const lastFocusedStyleProperty = React.useRef()
    const ScreenLoader = React.useRef()

    return (
        <getReferenceContext.Provider value={{
            Canvas,
            Highlight,
            Indicator,
            SelectedBlock,
            lastPointer,
            lastAddElement,
            lastFocusedStyleProperty,
            ScreenLoader
        }}>
            {props.children}
        </getReferenceContext.Provider>
    )

}