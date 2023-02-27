import React from 'react'

export const getAuthContext = React.createContext();

export const AuthContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = React.useState(true)
    const [allowedModules, setAllowedModules] = React.useState([])

    return (
        <getAuthContext.Provider value={{
            loggedIn,
            allowedModules,
            setAllowedModules
        }}>
            {props.children}
        </getAuthContext.Provider>
    )

}